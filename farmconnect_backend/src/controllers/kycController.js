const BaseController = require('./baseController');
const { KycDocument, User } = require('../models');
const Joi = require('joi');
const { Op } = require('sequelize');

// Validation schema for KYC document submission
const kycDocumentSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  documentType: Joi.string().valid('national_id', 'passport', 'drivers_license', 'utility_bill').required(),
  documentNumber: Joi.string().required(),
  documentImages: Joi.array().items(Joi.string().uri()).min(1).required(),
  status: Joi.string().valid('pending', 'verified', 'rejected').default('pending'),
  rejectionReason: Joi.string().allow(''),
  metadata: Joi.object().default({})
});

// Validation schema for KYC status update
const kycStatusSchema = Joi.object({
  status: Joi.string().valid('verified', 'rejected').required(),
  rejectionReason: Joi.when('status', {
    is: 'rejected',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('')
  })
});

class KycController extends BaseController {
  constructor() {
    super(KycDocument);
  }

  getIncludes() {
    return [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'kycStatus']
      }
    ];
  }

  // Override create to add validation and update user KYC status
  async create(req, res) {
    const t = await KycDocument.sequelize.transaction();
    
    try {
      // Validate request body
      const { error } = kycDocumentSchema.validate(req.body);
      if (error) {
        await t.rollback();
        return res.status(400).json({ message: error.details[0].message });
      }

      const { userId, documentType, documentNumber, documentImages } = req.body;

      // Ownership check: only the user themselves or admin can submit KYC for a given userId
      if (req.user && req.user.role !== 'admin' && req.user.id !== userId) {
        await t.rollback();
        return res.status(403).json({ message: 'Forbidden: cannot submit KYC for other users' });
      }

      // Check if user exists
      const user = await User.findByPk(userId, { transaction: t });
      if (!user) {
        await t.rollback();
        return res.status(404).json({ message: 'User not found' });
      }

      // Check for existing pending KYC
      const existingKyc = await KycDocument.findOne({
        where: {
          userId,
          status: 'pending'
        },
        transaction: t
      });

      if (existingKyc) {
        await t.rollback();
        return res.status(400).json({ 
          message: 'You already have a pending KYC submission' 
        });
      }

      // Create KYC document
      const kycDocument = await KycDocument.create({
        userId,
        documentType,
        documentNumber,
        documentImages,
        status: 'pending',
        metadata: {
          submittedAt: new Date(),
          ipAddress: req.ip,
          userAgent: req.get('user-agent')
        }
      }, { transaction: t });

      // Update user KYC status to 'pending'
      await user.update({ kycStatus: 'pending' }, { transaction: t });

      // Commit transaction
      await t.commit();

      // Fetch the complete KYC document with user info
      const result = await KycDocument.findByPk(kycDocument.id, {
        include: this.getIncludes()
      });

      // TODO: Notify admin about new KYC submission
      // await createAdminNotification({
      //   title: 'New KYC Submission',
      //   message: `${user.firstName} ${user.lastName} has submitted KYC documents for verification`,
      //   type: 'kyc_submission',
      //   actionUrl: `/admin/kyc/${kycDocument.id}`,
      //   metadata: {
      //     userId: user.id,
      //     kycId: kycDocument.id
      //   }
      // });

      res.status(201).json(result);
    } catch (error) {
      await t.rollback();
      console.error('Error submitting KYC documents:', error);
      res.status(500).json({ 
        message: 'Error submitting KYC documents', 
        error: error.message 
      });
    }
  }

  // Update KYC status (admin only)
  async updateStatus(req, res) {
    const t = await KycDocument.sequelize.transaction();
    
    try {
      const { id } = req.params;
      
      // Validate request body
      const { error } = kycStatusSchema.validate(req.body);
      if (error) {
        await t.rollback();
        return res.status(400).json({ message: error.details[0].message });
      }

      const { status, rejectionReason } = req.body;
      
      // Find the KYC document
      const kycDocument = await KycDocument.findByPk(id, { 
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email', 'kycStatus']
          }
        ],
        transaction: t 
      });

      if (!kycDocument) {
        await t.rollback();
        return res.status(404).json({ message: 'KYC document not found' });
      }

      // Check if KYC is already processed
      if (kycDocument.status !== 'pending') {
        await t.rollback();
        return res.status(400).json({ 
          message: `KYC has already been ${kycDocument.status}` 
        });
      }

      // Update KYC document status
      await kycDocument.update({
        status,
        rejectionReason: status === 'rejected' ? rejectionReason : null,
        reviewedAt: new Date(),
        reviewedBy: req.user.id, // Assuming admin user is authenticated
        metadata: {
          ...(kycDocument.metadata || {}),
          reviewedAt: new Date(),
          reviewedBy: req.user.id,
          statusChangedFrom: kycDocument.status,
          statusChangedTo: status
        }
      }, { transaction: t });

      // Update user KYC status
      const userKycStatus = status === 'verified' ? 'verified' : 'unverified';
      await kycDocument.user.update({ kycStatus: userKycStatus }, { transaction: t });

      // Commit transaction
      await t.commit();

      // Send notification to user
      const notificationService = require('./notificationController');
      try {
        await notificationService.createFromPayload({
          type: 'kyc_' + status,
          title: `KYC ${status === 'verified' ? 'Approved' : 'Rejected'}`,
          message: status === 'verified'
            ? 'Your KYC documents have been verified. You can now access all features.'
            : `Your KYC documents were rejected. Reason: ${rejectionReason}`,
          actionUrl: '/profile/verification',
          userId: kycDocument.userId,
          metadata: {
            kycId: kycDocument.id,
            status,
            rejectionReason: status === 'rejected' ? rejectionReason : undefined
          }
        });
      } catch (notifyErr) {
        // Log and continue; do not fail the request due to notification error
        console.error('Error creating KYC notification:', notifyErr.message);
      }

      res.json({
        message: `KYC ${status} successfully`,
        kycStatus: userKycStatus,
        document: kycDocument
      });
    } catch (error) {
      await t.rollback();
      console.error('Error updating KYC status:', error);
      res.status(500).json({ 
        message: 'Error updating KYC status', 
        error: error.message 
      });
    }
  }

  // Get KYC documents with filtering and pagination
  async getKycDocuments(req, res) {
    try {
      const { 
        userId, 
        status, 
        documentType, 
        startDate, 
        endDate, 
        page = 1, 
        limit = 10 
      } = req.query;
      
      const where = {};
      
      // Apply filters
      if (userId) where.userId = userId;
      if (status) where.status = status;
      if (documentType) where.documentType = documentType;
      
      // Date range filter
      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt[Op.gte] = new Date(startDate);
        if (endDate) where.createdAt[Op.lte] = new Date(endDate);
      }

      const { count, rows } = await KycDocument.findAndCountAll({
        where,
        include: this.getIncludes(),
        order: [['createdAt', 'DESC']],
        offset: (page - 1) * limit,
        limit: parseInt(limit)
      });

      res.json({
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching KYC documents:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Get KYC status for a user
  async getKycStatus(req, res) {
    try {
      const { userId } = req.params;
      
      // Ownership check: only the user themselves or admin can view their KYC status
      if (req.user && req.user.role !== 'admin' && req.user.id !== userId) {
        return res.status(403).json({ message: 'Forbidden: cannot access KYC status for other users' });
      }
      
      // Check if user exists
      const user = await User.findByPk(userId, {
        attributes: ['id', 'kycStatus'],
        include: [
          {
            model: KycDocument,
            as: 'kycDocuments',
            order: [['createdAt', 'DESC']],
            limit: 1
          }
        ]
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Get the latest KYC document
      const latestKyc = user.kycDocuments && user.kycDocuments.length > 0 
        ? user.kycDocuments[0] 
        : null;

      res.json({
        userId: user.id,
        kycStatus: user.kycStatus,
        latestKyc: latestKyc ? {
          id: latestKyc.id,
          documentType: latestKyc.documentType,
          status: latestKyc.status,
          submittedAt: latestKyc.createdAt,
          reviewedAt: latestKyc.reviewedAt,
          rejectionReason: latestKyc.rejectionReason
        } : null
      });
    } catch (error) {
      console.error('Error fetching KYC status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new KycController();
