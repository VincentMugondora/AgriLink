const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const KycDocument = sequelize.define('KycDocument', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  documentType: {
    type: DataTypes.ENUM('national_id', 'passport', 'drivers_license', 'utility_bill', 'other'),
    allowNull: false,
  },
  documentNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frontImageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  backImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  selfieImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'verified', 'rejected'),
    defaultValue: 'pending',
  },
  rejectionReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  verifiedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  verifiedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    // References the admin who verified this document
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    // Store any additional document-specific data
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId'],
    },
    {
      fields: ['documentType'],
    },
    {
      fields: ['status'],
    },
  ],
});

module.exports = KycDocument;
