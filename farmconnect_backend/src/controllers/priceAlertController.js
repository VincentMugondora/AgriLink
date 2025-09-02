const BaseController = require('./baseController');
const { PriceAlert, User, Product } = require('../models');
const Joi = require('joi');
const { Op } = require('sequelize');

// Validation schema for price alert creation
const priceAlertSchema = Joi.object({
  productName: Joi.string().required(),
  category: Joi.string().valid(
    'cereals', 'vegetables', 'fruits', 'tubers', 
    'legumes', 'livestock', 'poultry', 'dairy', 'other'
  ).required(),
  condition: Joi.string().valid('above', 'below', 'equal').required(),
  targetPrice: Joi.number().min(0).required(),
  currency: Joi.string().valid('USD', 'ZWL').default('USD'),
  unit: Joi.string().valid('kg', 'g', 'tonne', 'liter', 'piece', 'dozen').required(),
  userId: Joi.string().uuid().required()
});

class PriceAlertController extends BaseController {
  constructor() {
    super(PriceAlert);
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

  // Override create to add validation and set defaults
  async create(req, res) {
    try {
      // Validate request body
      const { error } = priceAlertSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { userId } = req.body;

      // Check if user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check for duplicate active alert
      const existingAlert = await PriceAlert.findOne({
        where: {
          userId,
          productName: req.body.productName,
          category: req.body.category,
          isActive: true
        }
      });

      if (existingAlert) {
        return res.status(400).json({ 
          message: 'An active alert already exists for this product and category' 
        });
      }

      // Create price alert
      const priceAlert = await PriceAlert.create({
        ...req.body,
        isActive: true,
        triggerCount: 0,
        lastTriggeredAt: null
      });

      res.status(201).json(priceAlert);
    } catch (error) {
      console.error('Error creating price alert:', error);
      res.status(500).json({ message: 'Error creating price alert', error: error.message });
    }
  }

  // Get active price alerts for a user
  async getActiveAlerts(req, res) {
    try {
      const { userId } = req.params;
      
      const alerts = await PriceAlert.findAll({
        where: {
          userId,
          isActive: true
        },
        order: [['createdAt', 'DESC']]
      });

      res.json(alerts);
    } catch (error) {
      console.error('Error fetching active price alerts:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Toggle price alert status
  async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      
      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'isActive must be a boolean value' });
      }

      const alert = await PriceAlert.findByPk(id);
      
      if (!alert) {
        return res.status(404).json({ message: 'Price alert not found' });
      }

      await alert.update({ isActive });

      res.json(alert);
    } catch (error) {
      console.error('Error toggling price alert status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Check price alerts against current market prices
  async checkAlerts(req, res) {
    try {
      const { productName, category, currentPrice } = req.body;
      
      if (!productName || !category || currentPrice === undefined) {
        return res.status(400).json({ 
          message: 'productName, category, and currentPrice are required' 
        });
      }

      // Find all active alerts for this product and category
      const alerts = await PriceAlert.findAll({
        where: {
          productName,
          category,
          isActive: true
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
          }
        ]
      });

      const triggeredAlerts = [];
      const notificationService = require('./notificationController');

      // Check each alert against current price
      for (const alert of alerts) {
        let isTriggered = false;
        
        switch (alert.condition) {
          case 'above':
            isTriggered = currentPrice > alert.targetPrice;
            break;
          case 'below':
            isTriggered = currentPrice < alert.targetPrice;
            break;
          case 'equal':
            isTriggered = currentPrice === alert.targetPrice;
            break;
        }

        if (isTriggered) {
          // Update alert with trigger info
          await alert.update({
            lastTriggeredAt: new Date(),
            triggerCount: (alert.triggerCount || 0) + 1
          });

          // Create notification for user
          await notificationService.create({
            body: {
              type: 'price_alert',
              title: 'Price Alert Triggered',
              message: `The price of ${alert.productName} is now ${currentPrice} ${alert.currency}/${alert.unit}, which is ${alert.condition} your target of ${alert.targetPrice} ${alert.currency}/${alert.unit}`,
              actionUrl: `/products/search?q=${encodeURIComponent(alert.productName)}`,
              userId: alert.userId,
              metadata: {
                productName: alert.productName,
                category: alert.category,
                currentPrice,
                targetPrice: alert.targetPrice,
                condition: alert.condition,
                unit: alert.unit,
                currency: alert.currency
              }
            }
          }, res);

          triggeredAlerts.push({
            alertId: alert.id,
            userId: alert.userId,
            productName: alert.productName,
            category: alert.category,
            condition: alert.condition,
            targetPrice: alert.targetPrice,
            currentPrice,
            unit: alert.unit,
            currency: alert.currency
          });
        }
      }

      res.json({
        message: `Checked ${alerts.length} alerts, ${triggeredAlerts.length} triggered`,
        triggeredAlerts
      });
    } catch (error) {
      console.error('Error checking price alerts:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Get price alerts by user with pagination
  async getByUser(req, res) {
    try {
      const { userId } = req.params;
      const { 
        isActive, 
        page = 1, 
        limit = 10 
      } = req.query;
      
      const where = { userId };
      
      // Apply filters
      if (isActive !== undefined) {
        where.isActive = isActive === 'true';
      }

      const { count, rows } = await PriceAlert.findAndCountAll({
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
      console.error('Error fetching user price alerts:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new PriceAlertController();
