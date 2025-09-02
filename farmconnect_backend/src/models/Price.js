const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Price = sequelize.define('Price', {
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
  grade: {
    type: DataTypes.ENUM('A', 'B', 'C', 'D'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  market: {
    type: DataTypes.ENUM('zmx', 'mbare', 'ama', 'wfp', 'other'),
    allowNull: false,
  },
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['productName'],
    },
    {
      fields: ['category'],
    },
    {
      fields: ['market'],
    },
    {
      fields: ['timestamp'],
    },
  ],
});

module.exports = Price;
