const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const transactionRoutes = require('./transactionRoutes');
const notificationRoutes = require('./notificationRoutes');
const priceAlertRoutes = require('./priceAlertRoutes');
const adminRoutes = require('./adminRoutes');
const kycRoutes = require('./kycRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const uploadRoutes = require('./uploadRoutes');
const userRoutes = require('./userRoutes');
const { sequelize } = require('../config/database');

// Authentication routes
router.use('/auth', authRoutes);

// API routes
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/transactions', transactionRoutes);
router.use('/notifications', notificationRoutes);
router.use('/price-alerts', priceAlertRoutes);
router.use('/kyc', kycRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/admin', adminRoutes);
router.use('/uploads', uploadRoutes);
router.use('/users', userRoutes);

// Health check endpoint (DB + PostGIS)
router.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    const [rows] = await sequelize.query("SELECT extname FROM pg_extension WHERE extname='postgis'");
    const postgis = Array.isArray(rows) && rows.length > 0;
    res.json({ status: 'ok', db: 'up', postgis, timestamp: new Date() });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'down', message: err.message, timestamp: new Date() });
  }
});

// 404 handler for API routes (within this router scope)
router.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

module.exports = router;
