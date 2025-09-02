const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
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
    ),
    defaultValue: 'pending',
  },
  paymentMethod: {
    type: DataTypes.ENUM('ecocash', 'onemoney', 'zipit', 'bank_transfer', 'cash'),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending',
  },
  deliveryAddress: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  deliveryInstructions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  estimatedDeliveryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  actualDeliveryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['buyerId'],
    },
    {
      fields: ['sellerId'],
    },
    {
      fields: ['status'],
    },
    {
      fields: ['paymentStatus'],
    },
  ],
});

module.exports = Order;
