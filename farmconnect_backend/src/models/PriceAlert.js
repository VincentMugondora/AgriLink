const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PriceAlert = sequelize.define('PriceAlert', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM(
      'cereals', 'vegetables', 'fruits', 'tubers', 
      'legumes', 'livestock', 'poultry', 'dairy', 'other'
    ),
    allowNull: false,
  },
  condition: {
    type: DataTypes.ENUM('above', 'below', 'equals'),
    allowNull: false,
  },
  targetPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'USD',
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  lastTriggeredAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  triggerCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId'],
    },
    {
      fields: ['isActive'],
    },
    {
      fields: ['productName'],
    },
    {
      fields: ['category'],
    },
  ],
});

module.exports = PriceAlert;
