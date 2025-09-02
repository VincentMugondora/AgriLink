const { sequelize } = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Price = require('./Price');
const KycDocument = require('./KycDocument');
const Transaction = require('./Transaction');
const Notification = require('./Notification');
const PriceAlert = require('./PriceAlert');

// Define associations

// User relationships
User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
User.hasMany(Order, { foreignKey: 'buyerId', as: 'buyerOrders' });
User.hasMany(Order, { foreignKey: 'sellerId', as: 'sellerOrders' });
User.hasMany(KycDocument, { foreignKey: 'userId', as: 'kycDocuments' });
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
User.hasMany(PriceAlert, { foreignKey: 'userId', as: 'priceAlerts' });

// Product relationships
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
Product.hasMany(Order, { foreignKey: 'productId', as: 'orders' });
Product.hasMany(Price, { foreignKey: 'productId', as: 'priceHistory' });

// Order relationships
Order.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });
Order.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Order.hasMany(Transaction, { foreignKey: 'orderId', as: 'transactions' });

// KYC Document relationships
KycDocument.belongsTo(User, { foreignKey: 'userId', as: 'user' });
KycDocument.belongsTo(User, { 
  foreignKey: 'verifiedBy', 
  as: 'verifiedByAdmin',
  constraints: false,
});

// Transaction relationships
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Transaction.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Notification relationships
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Price Alert relationships
PriceAlert.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Price relationships
Price.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Product,
  Order,
  Price,
  KycDocument,
  Transaction,
  Notification,
  PriceAlert,
};
