const { Op, fn, col } = require('sequelize');
const { Product, Order } = require('../models');
const logger = require('../utils/logger');

/**
 * GET /api/dashboard/stats
 * Returns dashboard statistics based on the authenticated user's role
 */
const getStats = async (req, res) => {
  try {
    const user = req.user;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const activeStatuses = ['pending', 'accepted', 'payment_pending', 'paid', 'shipped'];

    let totalProducts = 0;
    let activeOrders = 0;
    let monthlyRevenue = 0;
    let connections = 0;

    if (user.role === 'farmer' || user.role === 'trader') {
      totalProducts = await Product.count({ where: { sellerId: user.id } });

      activeOrders = await Order.count({
        where: {
          sellerId: user.id,
          status: { [Op.in]: activeStatuses },
        },
      });

      const revenueRow = await Order.findOne({
        where: {
          sellerId: user.id,
          paymentStatus: 'completed',
          createdAt: { [Op.gte]: startOfMonth },
        },
        attributes: [[fn('COALESCE', fn('SUM', col('totalPrice')), 0), 'sum']],
        raw: true,
      });
      monthlyRevenue = parseFloat(revenueRow?.sum || 0);

      connections = await Order.count({
        where: { sellerId: user.id },
        distinct: true,
        col: 'buyerId',
      });
    } else if (user.role === 'buyer') {
      totalProducts = 0;

      activeOrders = await Order.count({
        where: {
          buyerId: user.id,
          status: { [Op.in]: activeStatuses },
        },
      });

      const spendRow = await Order.findOne({
        where: {
          buyerId: user.id,
          paymentStatus: 'completed',
          createdAt: { [Op.gte]: startOfMonth },
        },
        attributes: [[fn('COALESCE', fn('SUM', col('totalPrice')), 0), 'sum']],
        raw: true,
      });
      monthlyRevenue = parseFloat(spendRow?.sum || 0);

      connections = await Order.count({
        where: { buyerId: user.id },
        distinct: true,
        col: 'sellerId',
      });
    } else if (user.role === 'admin') {
      totalProducts = await Product.count();
      activeOrders = await Order.count({
        where: { status: { [Op.in]: activeStatuses } },
      });
      const revenueRow = await Order.findOne({
        where: {
          paymentStatus: 'completed',
          createdAt: { [Op.gte]: startOfMonth },
        },
        attributes: [[fn('COALESCE', fn('SUM', col('totalPrice')), 0), 'sum']],
        raw: true,
      });
      monthlyRevenue = parseFloat(revenueRow?.sum || 0);
      connections = await Order.count({
        distinct: true,
        col: 'buyerId',
      });
    }

    return res.json({
      totalProducts,
      activeOrders,
      monthlyRevenue,
      connections,
    });
  } catch (error) {
    logger.error('Dashboard stats error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getStats };
