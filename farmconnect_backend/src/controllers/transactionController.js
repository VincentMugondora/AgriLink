const BaseController = require('./baseController');
const { Transaction, User, Order } = require('../models');
const Joi = require('joi');

// Validation schema for transaction creation
const transactionSchema = Joi.object({
  amount: Joi.number().min(0.01).required(),
  currency: Joi.string().valid('USD', 'ZWL').default('USD'),
  type: Joi.string().valid(
    'deposit', 'withdrawal', 'escrow_hold', 'escrow_release', 'refund', 'fee'
  ).required(),
  paymentMethod: Joi.string().valid(
    'ecocash', 'on_delivery', 'bank_transfer', 'zipit', 'wallet'
  ).required(),
  paymentReference: Joi.string().allow(''),
  description: Joi.string().allow(''),
  userId: Joi.string().uuid().required(),
  orderId: Joi.string().uuid().allow(null)
});

class TransactionController extends BaseController {
  constructor() {
    super(Transaction);
  }

  getIncludes() {
    return [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
      },
      {
        model: Order,
        as: 'order',
        include: [
          {
            model: User,
            as: 'buyer',
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name']
          }
        ]
      }
    ];
  }

  // Override create to add validation and transaction processing
  async create(req, res) {
    const t = await Transaction.sequelize.transaction();
    
    try {
      // Validate request body
      const { error } = transactionSchema.validate(req.body);
      if (error) {
        await t.rollback();
        return res.status(400).json({ message: error.details[0].message });
      }

      const { userId, type, amount, orderId } = req.body;

      // Check if user exists
      const user = await User.findByPk(userId, { transaction: t });
      if (!user) {
        await t.rollback();
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if order exists (if orderId is provided)
      if (orderId) {
        const order = await Order.findByPk(orderId, { transaction: t });
        if (!order) {
          await t.rollback();
          return res.status(404).json({ message: 'Order not found' });
        }
      }

      // Handle different transaction types
      switch (type) {
        case 'deposit':
          // Add to user's wallet balance
          await user.update({ 
            walletBalance: (user.walletBalance || 0) + amount 
          }, { transaction: t });
          break;
          
        case 'withdrawal':
          // Check if user has sufficient balance
          if ((user.walletBalance || 0) < amount) {
            await t.rollback();
            return res.status(400).json({ message: 'Insufficient balance' });
          }
          
          // Deduct from user's wallet
          await user.update({ 
            walletBalance: (user.walletBalance || 0) - amount 
          }, { transaction: t });
          break;
          
        case 'escrow_hold':
          // Check if user has sufficient balance
          if ((user.walletBalance || 0) < amount) {
            await t.rollback();
            return res.status(400).json({ message: 'Insufficient balance' });
          }
          
          // Hold amount in escrow (deduct from available balance)
          await user.update({ 
            walletBalance: (user.walletBalance || 0) - amount,
            escrowBalance: (user.escrowBalance || 0) + amount
          }, { transaction: t });
          break;
          
        case 'escrow_release':
          // Check if there's enough in escrow
          if ((user.escrowBalance || 0) < amount) {
            await t.rollback();
            return res.status(400).json({ message: 'Insufficient escrow balance' });
          }
          
          // Release from escrow to seller's available balance
          await user.update({ 
            walletBalance: (user.walletBalance || 0) + amount,
            escrowBalance: (user.escrowBalance || 0) - amount
          }, { transaction: t });
          break;
          
        case 'refund':
          // Refund to user's wallet
          await user.update({ 
            walletBalance: (user.walletBalance || 0) + amount 
          }, { transaction: t });
          break;
          
        // For 'fee' type, we just record it, no balance change needed
      }

      // Create transaction record
      const transaction = await Transaction.create({
        ...req.body,
        status: 'completed',
        processedAt: new Date()
      }, { transaction: t });

      // Commit transaction
      await t.commit();

      // Fetch the complete transaction with relationships
      const result = await Transaction.findByPk(transaction.id, {
        include: this.getIncludes()
      });

      res.status(201).json(result);
    } catch (error) {
      await t.rollback();
      console.error('Error processing transaction:', error);
      res.status(500).json({ 
        message: 'Error processing transaction', 
        error: error.message 
      });
    }
  }

  // Get transactions by user
  async getByUser(req, res) {
    try {
      const { userId } = req.params;
      const { 
        type, 
        status, 
        startDate, 
        endDate, 
        page = 1, 
        limit = 10 
      } = req.query;
      
      const where = { userId };
      
      // Apply filters
      if (type) where.type = type;
      if (status) where.status = status;
      
      // Date range filter
      if (startDate || endDate) {
        where.processedAt = {};
        if (startDate) where.processedAt[Op.gte] = new Date(startDate);
        if (endDate) where.processedAt[Op.lte] = new Date(endDate);
      }

      const { count, rows } = await Transaction.findAndCountAll({
        where,
        include: [
          {
            model: Order,
            as: 'order',
            attributes: ['id', 'status'],
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name']
              }
            ]
          }
        ],
        order: [['processedAt', 'DESC']],
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
      console.error('Error fetching user transactions:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Get wallet balance
  async getWalletBalance(req, res) {
    try {
      const { userId } = req.params;
      
      const user = await User.findByPk(userId, {
        attributes: ['id', 'walletBalance', 'escrowBalance'],
        include: [
          {
            model: Transaction,
            as: 'transactions',
            where: {
              status: 'pending',
              type: ['withdrawal', 'escrow_hold']
            },
            required: false,
            attributes: ['id', 'amount', 'type', 'createdAt']
          }
        ]
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Calculate available balance (wallet - pending withdrawals)
      const pendingWithdrawals = user.transactions
        .filter(t => t.type === 'withdrawal')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      // Calculate available escrow (escrow - pending releases)
      const pendingEscrow = user.transactions
        .filter(t => t.type === 'escrow_hold')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      res.json({
        walletBalance: parseFloat(user.walletBalance || 0),
        escrowBalance: parseFloat(user.escrowBalance || 0),
        availableBalance: parseFloat(user.walletBalance || 0) - pendingWithdrawals,
        availableEscrow: parseFloat(user.escrowBalance || 0) - pendingEscrow,
        pendingWithdrawals,
        pendingEscrow
      });
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new TransactionController();
