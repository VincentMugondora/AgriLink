const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

/**
 * @route   /api/auth
 * @desc    Authentication routes
 */
router.use('/auth', authRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

module.exports = router;
