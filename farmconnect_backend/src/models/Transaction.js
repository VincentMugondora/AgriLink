const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'USD',
  },
  type: {
    type: DataTypes.ENUM(
      'deposit',
      'withdrawal',
      'escrow_hold',
      'escrow_release',
      'escrow_refund',
      'purchase',
      'refund',
      'payout',
      'fee',
      'bonus',
      'other'
    ),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'pending',
      'processing',
      'completed',
      'failed',
      'cancelled',
      'reversed'
    ),
    defaultValue: 'pending',
  },
  paymentMethod: {
    type: DataTypes.ENUM('ecocash', 'onemoney', 'zipit', 'bank_transfer', 'wallet', 'other'),
    allowNull: false,
  },
  paymentReference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  processedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  failureReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId'],
    },
    {
      fields: ['orderId'],
    },
    {
      fields: ['type'],
    },
    {
      fields: ['status'],
    },
    {
      fields: ['paymentReference'],
      unique: true,
    },
  ],
});

module.exports = Transaction;
