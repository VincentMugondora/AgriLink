const express = require('express');
const router = express.Router();
const priceAlertController = require('../controllers/priceAlertController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes (require authentication)
router.use(protect);

// User routes
router.post('/', authorize('buyer'), priceAlertController.create);
router.get('/user/:userId', authorize('buyer'), priceAlertController.getByUser);
router.get('/active/user/:userId', authorize('buyer'), priceAlertController.getActiveAlerts);
router.put('/toggle/:id', authorize('buyer'), priceAlertController.toggleStatus);

// Admin/system routes
router.post('/check', priceAlertController.checkAlerts);

module.exports = router;
