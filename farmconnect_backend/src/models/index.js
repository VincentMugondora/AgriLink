const { sequelize } = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Price = require('./Price');

// Define associations
User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

// Buyer orders
User.hasMany(Order, { foreignKey: 'buyerId', as: 'buyerOrders' });
Order.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });

// Seller orders
User.hasMany(Order, { foreignKey: 'sellerId', as: 'sellerOrders' });
Order.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

// Product orders
Product.hasMany(Order, { foreignKey: 'productId', as: 'orders' });
Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Product,
  Order,
  Price,
};
