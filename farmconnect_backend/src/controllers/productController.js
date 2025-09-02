const BaseController = require('./baseController');
const { Product, User, Order } = require('../models');
const Joi = require('joi');
const { Op, Sequelize } = require('sequelize');

// Validation schema for product creation
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  category: Joi.string().valid(
    'cereals', 'vegetables', 'fruits', 'tubers', 
    'legumes', 'livestock', 'poultry', 'dairy', 'other'
  ).required(),
  grade: Joi.string().valid('A', 'B', 'C', 'D').required(),
  pricePerUnit: Joi.number().min(0).required(),
  unit: Joi.string().valid('kg', 'g', 'tonne', 'liter', 'piece', 'dozen').required(),
  quantity: Joi.number().min(0).required(),
  availableQuantity: Joi.number().min(0).required(),
  location: Joi.object({
    type: Joi.string().valid('Point').default('Point'),
    coordinates: Joi.array().items(Joi.number()).length(2).required()
  }),
  harvestDate: Joi.date(),
  isOrganic: Joi.boolean().default(false),
  status: Joi.string().valid('available', 'sold_out', 'inactive').default('available'),
  images: Joi.array().items(Joi.string()),
  sellerId: Joi.string().uuid().required()
});

class ProductController extends BaseController {
  constructor() {
    super(Product);
  }

  getIncludes() {
    return [
      {
        model: User,
        as: 'seller',
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
      },
      {
        model: Order,
        as: 'orders',
        include: [
          {
            model: User,
            as: 'buyer',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
          }
        ]
      }
    ];
  }

  // Override create to add validation
  async create(req, res) {
    try {
      // Validate request body
      const { error } = productSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      // Ownership check: only the seller themselves or admin can create a product for a given sellerId
      if (req.user && req.user.role !== 'admin' && req.user.id !== req.body.sellerId) {
        return res.status(403).json({ message: 'Forbidden: cannot create products for other users' });
      }

      // Check if seller exists
      const seller = await User.findByPk(req.body.sellerId);
      if (!seller) {
        return res.status(400).json({ message: 'Seller not found' });
      }

      // Create product
      const product = await Product.create(req.body);
      
      // Include seller in response
      const result = await Product.findByPk(product.id, {
        include: [
          {
            model: User,
            as: 'seller',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
          }
        ]
      });

      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(400).json({ message: error.message });
    }
  }

  // Get products by seller
  async getBySeller(req, res) {
    try {
      const { sellerId } = req.params;
      const { status, page = 1, limit = 10 } = req.query;
      
      // Ownership check: only the seller themselves or admin can view
      if (req.user && req.user.role !== 'admin' && req.user.id !== sellerId) {
        return res.status(403).json({ message: 'Forbidden: cannot access products for other users' });
      }
      
      const where = { sellerId };
      if (status) {
        where.status = status;
      }

      const { count, rows } = await Product.findAndCountAll({
        where,
        include: [
          {
            model: User,
            as: 'seller',
            attributes: ['id', 'firstName', 'lastName']
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
      console.error('Error fetching products by seller:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Override update to enforce ownership
  async update(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (req.user && req.user.role !== 'admin' && req.user.id !== product.sellerId) {
        return res.status(403).json({ message: 'Forbidden: cannot update this product' });
      }

      await product.update(req.body);
      res.json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Override delete to enforce ownership
  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (req.user && req.user.role !== 'admin' && req.user.id !== product.sellerId) {
        return res.status(403).json({ message: 'Forbidden: cannot delete this product' });
      }

      await product.destroy();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Search products with filters
  async search(req, res) {
    try {
      const { 
        query, 
        category, 
        minPrice, 
        maxPrice, 
        location, 
        radius = 10, // in kilometers
        page = 1, 
        limit = 10 
      } = req.query;

      const where = {};
      
      // Text search
      if (query) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } }
        ];
      }

      // Category filter
      if (category) {
        where.category = category;
      }

      // Price range filter
      if (minPrice || maxPrice) {
        where.pricePerUnit = {};
        if (minPrice) where.pricePerUnit[Op.gte] = parseFloat(minPrice);
        if (maxPrice) where.pricePerUnit[Op.lte] = parseFloat(maxPrice);
      }

      // Location-based filtering (if location coordinates provided)
      let order = [];
      if (location) {
        const [lng, lat] = location.split(',').map(Number);
        
        // Add distance calculation to order
        order = [
          [
            // Using raw SQL for distance calculation with PostGIS
            Sequelize.literal(
              `ST_Distance(
                location::geography, 
                ST_MakePoint(${lng}, ${lat})::geography
              ) / 1000` // Convert meters to kilometers
            ),
            'ASC'
          ]
        ];

        // Add distance filter if radius is specified
        if (radius) {
          where[Sequelize.Op.and] = [
            Sequelize.literal(
              `ST_DWithin(
                location::geography, 
                ST_MakePoint(${lng}, ${lat})::geography, 
                ${radius * 1000}
              )`
            )
          ];
        }
      }

      const { count, rows } = await Product.findAndCountAll({
        where,
        include: [
          {
            model: User,
            as: 'seller',
            attributes: ['id', 'firstName', 'lastName', 'phone']
          }
        ],
        order: order.length ? order : [['createdAt', 'DESC']],
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
      console.error('Error searching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new ProductController();
