const BaseController = require('./baseController');
const { Order, Product, User, Transaction } = require('../models');
const Joi = require('joi');
const { Op } = require('sequelize');

// Validation schema for order creation
const orderSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  quantity: Joi.number().min(0.1).required(),
  deliveryAddress: Joi.string().required(),
  deliveryInstructions: Joi.string().allow(''),
  paymentMethod: Joi.string().valid('ecocash', 'onemoney', 'zipit', 'bank_transfer', 'cash').required(),
  buyerId: Joi.string().uuid().required()
});

// Validation schema for order status update
const statusUpdateSchema = Joi.object({
  status: Joi.string().valid(
    'pending',
    'accepted',
    'rejected',
    'payment_pending',
    'paid',
    'shipped',
    'delivered',
    'cancelled',
    'disputed',
    'refunded'
  ).required(),
  cancellationReason: Joi.string().when('status', {
    is: 'cancelled',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('')
  })
});

class OrderController extends BaseController {
  constructor() {
    super(Order);
  }

  getIncludes() {
    return [
      {
        model: Product,
        as: 'product',
        include: [
          {
            model: User,
            as: 'seller',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
          }
        ]
      },
      {
        model: User,
        as: 'buyer',
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
      },
      {
        model: Transaction,
        as: 'transactions',
        attributes: ['id', 'amount', 'type', 'status', 'createdAt']
      }
    ];
  }

  // Override getById to enforce ownership on buyer/seller routes
  async getById(req, res) {
    try {
      const { id, buyerId, sellerId } = req.params;
      const order = await Order.findByPk(id, { include: this.getIncludes() });

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // Admin can access any order
      if (req.user && req.user.role === 'admin') {
        return res.json(order);
      }

      // If route carries buyerId, enforce buyer ownership and order association
      if (buyerId) {
        if (!req.user || req.user.id !== buyerId) {
          return res.status(403).json({ message: 'Forbidden: cannot access orders for other users' });
        }
        if (order.buyerId !== buyerId) {
          return res.status(404).json({ message: 'Order not found for this buyer' });
        }
        return res.json(order);
      }

      // If route carries sellerId, enforce seller ownership and order association
      if (sellerId) {
        if (!req.user || req.user.id !== sellerId) {
          return res.status(403).json({ message: 'Forbidden: cannot access orders for other users' });
        }
        if (order.sellerId !== sellerId) {
          return res.status(404).json({ message: 'Order not found for this seller' });
        }
        return res.json(order);
      }

      // Fallback: enforce based on user role
      if (req.user) {
        if (req.user.role === 'buyer' && order.buyerId === req.user.id) {
          return res.json(order);
        }
        if ((req.user.role === 'farmer' || req.user.role === 'trader') && order.sellerId === req.user.id) {
          return res.json(order);
        }
      }

      return res.status(403).json({ message: 'Forbidden: not authorized to view this order' });
    } catch (error) {
      console.error('Error fetching order:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Override create to handle order placement
  async create(req, res) {
    const t = await Order.sequelize.transaction();
    
    try {
      // Validate request body
      const { error } = orderSchema.validate(req.body);
      if (error) {
        await t.rollback();
        return res.status(400).json({ message: error.details[0].message });
      }

      const { productId, quantity, buyerId } = req.body;

      // Ownership check: only the buyer themselves or admin can create an order for a given buyerId
      if (req.user && req.user.role !== 'admin' && req.user.id !== buyerId) {
        await t.rollback();
        return res.status(403).json({ message: 'Forbidden: cannot create orders for other users' });
      }

      // Check if product exists and is available
      const product = await Product.findByPk(productId, { transaction: t });
      if (!product) {
        await t.rollback();
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.status !== 'available') {
        await t.rollback();
        return res.status(400).json({ 
          message: `Product is ${product.status}` 
        });
      }

      // Check available quantity
      if (product.availableQuantity < quantity) {
        await t.rollback();
        return res.status(400).json({ 
          message: `Only ${product.availableQuantity} ${product.unit} available` 
        });
      }

      // Check if buyer exists
      const buyer = await User.findByPk(buyerId, { transaction: t });
      if (!buyer) {
        await t.rollback();
        return res.status(404).json({ message: 'Buyer not found' });
      }

      // Calculate total price
      const totalPrice = product.pricePerUnit * quantity;

      // Create order
      const order = await Order.create({
        ...req.body,
        sellerId: product.sellerId,
        unitPrice: product.pricePerUnit,
        totalPrice,
        status: 'pending'
      }, { transaction: t });

      // Update product available quantity
      await product.update({
        availableQuantity: product.availableQuantity - quantity,
        status: (product.availableQuantity - quantity) === 0 ? 'sold_out' : 'available'
      }, { transaction: t });

      // Create transaction record (escrow hold)
      await Transaction.create({
        amount: totalPrice,
        currency: 'USD',
        type: 'escrow_hold',
        status: 'pending',
        userId: buyerId,
        orderId: order.id,
        description: `Payment for Order #${order.id}`
      }, { transaction: t });

      // Commit transaction
      await t.commit();

      // Fetch the complete order with relationships
      const result = await Order.findByPk(order.id, {
        include: this.getIncludes()
      });

      res.status(201).json(result);
    } catch (error) {
      await t.rollback();
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error creating order', error: error.message });
    }
  }

  // Update order status
  async updateStatus(req, res) {
    const t = await Order.sequelize.transaction();
    
    try {
      const { id } = req.params;
      
      // Validate request body
      const { error } = statusUpdateSchema.validate(req.body);
      if (error) {
        await t.rollback();
        return res.status(400).json({ message: error.details[0].message });
      }

      const { status, cancellationReason } = req.body;
      
      // Find the order
      const order = await Order.findByPk(id, { 
        include: ['product'],
        transaction: t 
      });

      if (!order) {
        await t.rollback();
        return res.status(404).json({ message: 'Order not found' });
      }

      // Ownership check: only the seller for this order or admin can update status
      if (req.user && req.user.role !== 'admin' && req.user.id !== order.sellerId) {
        await t.rollback();
        return res.status(403).json({ message: 'Forbidden: cannot update status for orders you do not own' });
      }

      // Check if status transition is valid (aligned with Order model enums)
      const validTransitions = {
        pending: ['accepted', 'rejected', 'cancelled', 'payment_pending'],
        accepted: ['payment_pending', 'cancelled'],
        payment_pending: ['paid', 'cancelled'],
        paid: ['shipped', 'cancelled', 'disputed'],
        shipped: ['delivered', 'disputed'],
        delivered: ['disputed'],
        cancelled: [],
        rejected: [],
        disputed: ['refunded'],
        refunded: []
      };

      const allowedStatuses = validTransitions[order.status] || [];
      if (!allowedStatuses.includes(status)) {
        await t.rollback();
        return res.status(400).json({ 
          message: `Cannot change status from ${order.status} to ${status}` 
        });
      }

      // Handle status-specific logic
      if (status === 'cancelled' || status === 'rejected') {
        // If order is being cancelled or rejected, return stock
        await order.product.update({
          availableQuantity: order.product.availableQuantity + order.quantity,
          status: 'available'
        }, { transaction: t });

        // Update any pending transactions
        await Transaction.update(
          { status: 'cancelled' },
          { 
            where: { 
              orderId: order.id,
              status: 'pending' 
            },
            transaction: t 
          }
        );
      } else if (status === 'delivered') {
        // If order is delivered, release funds to seller
        const transaction = await Transaction.findOne({
          where: { 
            orderId: order.id,
            type: 'escrow_hold',
            status: 'completed' 
          },
          transaction: t
        });

        if (transaction) {
          // Calculate platform fee (5%)
          const platformFee = order.totalPrice * 0.05;
          const sellerAmount = order.totalPrice - platformFee;

          // Create transaction for seller payment
          await Transaction.create({
            amount: sellerAmount,
            currency: 'USD',
            type: 'escrow_release',
            status: 'completed',
            userId: order.sellerId,
            orderId: order.id,
            description: `Payout for Order #${order.id}`
          }, { transaction: t });

          // Create platform fee transaction
          await Transaction.create({
            amount: platformFee,
            currency: 'USD',
            type: 'fee',
            status: 'completed',
            userId: order.buyerId,
            orderId: order.id,
            description: `Platform fee for Order #${order.id}`
          }, { transaction: t });
        }
      }

      // Update order status
      await order.update({
        status,
        ...(status === 'cancelled' && { cancellationReason })
      }, { transaction: t });

      // Commit transaction
      await t.commit();

      // Fetch the updated order with relationships
      const result = await Order.findByPk(order.id, {
        include: this.getIncludes()
      });

      res.json(result);
    } catch (error) {
      await t.rollback();
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
  }

  // Get orders by buyer
  async getByBuyer(req, res) {
    try {
      const { buyerId } = req.params;
      const { status, page = 1, limit = 10 } = req.query;
      
      // Ownership check: only the buyer or admin can view
      if (req.user && req.user.role !== 'admin' && req.user.id !== buyerId) {
        return res.status(403).json({ message: 'Forbidden: cannot access orders for other users' });
      }
      
      const where = { buyerId };
      if (status) {
        where.status = status;
      }

      const { count, rows } = await Order.findAndCountAll({
        where,
        include: [
          {
            model: Product,
            as: 'product',
            include: [
              {
                model: User,
                as: 'seller',
                attributes: ['id', 'firstName', 'lastName', 'phone']
              }
            ]
          },
          {
            model: Transaction,
            as: 'transactions',
            attributes: ['id', 'amount', 'type', 'status', 'createdAt']
          }
        ],
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
      console.error('Error fetching orders by buyer:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Get orders by seller
  async getBySeller(req, res) {
    try {
      const { sellerId } = req.params;
      const { status, page = 1, limit = 10 } = req.query;
      
      // Ownership check: only the seller or admin can view
      if (req.user && req.user.role !== 'admin' && req.user.id !== sellerId) {
        return res.status(403).json({ message: 'Forbidden: cannot access orders for other users' });
      }
      
      const where = { sellerId };
      if (status) {
        where.status = status;
      }

      const { count, rows } = await Order.findAndCountAll({
        where,
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'category', 'grade', 'unit']
          },
          {
            model: User,
            as: 'buyer',
            attributes: ['id', 'firstName', 'lastName', 'phone']
          },
          {
            model: Transaction,
            as: 'transactions',
            attributes: ['id', 'amount', 'type', 'status', 'createdAt']
          }
        ],
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
      console.error('Error fetching orders by seller:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new OrderController();
