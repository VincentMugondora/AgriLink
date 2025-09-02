const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const transactionRoutes = require('./transactionRoutes');
const notificationRoutes = require('./notificationRoutes');
const priceAlertRoutes = require('./priceAlertRoutes');
const kycRoutes = require('./kycRoutes');

// Authentication routes
router.use('/auth', authRoutes);

// API routes
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/transactions', transactionRoutes);
router.use('/notifications', notificationRoutes);
router.use('/price-alerts', priceAlertRoutes);
router.use('/kyc', kycRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 404 handler for API routes (within this router scope)
router.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

module.exports = router;
