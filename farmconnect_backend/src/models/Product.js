const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.ENUM(
      'cereals', 'vegetables', 'fruits', 'tubers', 
      'legumes', 'livestock', 'poultry', 'dairy', 'other'
    ),
    allowNull: false,
  },
  grade: {
    type: DataTypes.ENUM('A', 'B', 'C', 'D'),
    allowNull: false,
  },
  pricePerUnit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  unit: {
    type: DataTypes.ENUM('kg', 'g', 'tonne', 'liter', 'piece', 'dozen'),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  availableQuantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  location: {
    type: DataTypes.JSONB,
    allowNull: false,
    // Store as { type: 'Point', coordinates: [longitude, latitude] }
    // We'll handle spatial indexing separately as it requires special handling for JSONB
  },
  harvestDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isOrganic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'sold_out', 'inactive'),
    defaultValue: 'available',
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
}, {
  timestamps: true,
  indexes: [
    // Removed GIST index on JSONB field as it requires special handling
    {
      fields: ['sellerId']
    },
    {
      fields: ['category']
    },
    {
      fields: ['status']
    },
    // Add a regular index on location for faster lookups
    {
      name: 'products_location_idx',
      fields: ['location']
    }
  ],
});

module.exports = Product;
