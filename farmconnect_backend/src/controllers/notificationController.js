const BaseController = require('./baseController');
const { Notification, User } = require('../models');
const Joi = require('joi');
const { Op } = require('sequelize');

// Validation schema for notification creation
const notificationSchema = Joi.object({
  type: Joi.string().valid(
    'order_placed', 'order_confirmed', 'order_shipped', 'order_delivered', 
    'order_cancelled', 'payment_received', 'kyc_approved', 'kyc_rejected',
    'price_alert', 'system', 'promotion'
  ).required(),
  title: Joi.string().required(),
  message: Joi.string().required(),
  actionUrl: Joi.string().allow(''),
  userId: Joi.string().uuid().required(),
  expiresAt: Joi.date().allow(null),
  metadata: Joi.object().default({})
});

class NotificationController extends BaseController {
  constructor() {
    super(Notification);
  }

  getIncludes() {
    return [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
      }
    ];
  }

  // Internal helper to create notifications without Express res object
  async createFromPayload(payload) {
    // Validate payload
    const { error } = notificationSchema.validate(payload);
    if (error) {
      const err = new Error(error.details[0].message);
      err.statusCode = 400;
      throw err;
    }

    const { userId } = payload;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }

    // Create notification
    const notification = await Notification.create({
      ...payload,
      isRead: false,
      readAt: null,
      expiresAt: payload.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days default
    });

    // Emit real-time notification if needed
    // emitNotification(userId, notification);

    return notification;
  }

  // Override create to add validation and set defaults using helper
  async create(req, res) {
    try {
      const notification = await this.createFromPayload(req.body);
      res.status(201).json(notification);
    } catch (error) {
      console.error('Error creating notification:', error);
      const status = error.statusCode || 500;
      res.status(status).json({ message: status === 500 ? 'Error creating notification' : error.message, error: error.message });
    }
  }

  // Get unread notifications count
  async getUnreadCount(req, res) {
    try {
      const { userId } = req.params;
      // Ownership check: only the user or admin can access
      if (req.user && req.user.role !== 'admin' && req.user.id !== userId) {
        return res.status(403).json({ message: 'Forbidden: cannot access notifications for other users' });
      }
      
      const count = await Notification.count({
        where: { 
          userId,
          isRead: false,
          [Op.or]: [
            { expiresAt: null },
            { expiresAt: { [Op.gt]: new Date() } }
          ]
        }
      });

      res.json({ count });
    } catch (error) {
      console.error('Error fetching unread notifications count:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Mark notification as read
  async markAsRead(req, res) {
    try {
      const { id } = req.params;
      
      const notification = await Notification.findByPk(id);
      
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }

      // Ownership check: only owner or admin can mark as read
      if (req.user && req.user.role !== 'admin' && req.user.id !== notification.userId) {
        return res.status(403).json({ message: 'Forbidden: cannot modify notifications for other users' });
      }

      if (!notification.isRead) {
        await notification.update({
          isRead: true,
          readAt: new Date()
        });
      }

      res.json(notification);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Mark all notifications as read
  async markAllAsRead(req, res) {
    const t = await Notification.sequelize.transaction();
    
    try {
      const { userId } = req.params;
      // Ownership check
      if (req.user && req.user.role !== 'admin' && req.user.id !== userId) {
        await t.rollback();
        return res.status(403).json({ message: 'Forbidden: cannot modify notifications for other users' });
      }
      
      // Mark all unread notifications as read
      const [updatedCount] = await Notification.update(
        { 
          isRead: true,
          readAt: new Date() 
        },
        { 
          where: { 
            userId,
            isRead: false 
          },
          transaction: t
        }
      );

      await t.commit();
      
      res.json({ 
        message: `${updatedCount} notifications marked as read`,
        count: updatedCount
      });
    } catch (error) {
      await t.rollback();
      console.error('Error marking all notifications as read:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Get notifications by user with pagination
  async getByUser(req, res) {
    try {
      const { userId } = req.params;
      // Ownership check
      if (req.user && req.user.role !== 'admin' && req.user.id !== userId) {
        return res.status(403).json({ message: 'Forbidden: cannot access notifications for other users' });
      }
      const { 
        isRead, 
        type, 
        page = 1, 
        limit = 10 
      } = req.query;
      
      const where = { userId };
      
      // Apply filters
      if (isRead !== undefined) {
        where.isRead = isRead === 'true';
      }
      
      if (type) {
        where.type = type;
      }
      
      // Only include non-expired notifications
      where[Op.or] = [
        { expiresAt: null },
        { expiresAt: { [Op.gt]: new Date() } }
      ];

      const { count, rows } = await Notification.findAndCountAll({
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
      console.error('Error fetching user notifications:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Delete expired notifications
  async deleteExpired(req, res) {
    const t = await Notification.sequelize.transaction();
    
    try {
      const { userId } = req.params;
      // Ownership check
      if (req.user && req.user.role !== 'admin' && req.user.id !== userId) {
        await t.rollback();
        return res.status(403).json({ message: 'Forbidden: cannot delete notifications for other users' });
      }
      
      // Delete expired notifications
      const deletedCount = await Notification.destroy({
        where: {
          userId,
          expiresAt: { [Op.lt]: new Date() }
        },
        transaction: t
      });

      await t.commit();
      
      res.json({ 
        message: `${deletedCount} expired notifications deleted`,
        count: deletedCount
      });
    } catch (error) {
      await t.rollback();
      console.error('Error deleting expired notifications:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new NotificationController();
