const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes (require authentication)
router.use(protect);

// Buyer routes
router.post('/', authorize('buyer'), orderController.create);
router.get('/buyer/:buyerId', authorize('buyer'), orderController.getByBuyer);
router.get('/buyer/:buyerId/:id', authorize('buyer'), orderController.getById);

// Seller routes
router.get('/seller/:sellerId', authorize('farmer', 'trader'), orderController.getBySeller);
router.get('/seller/:sellerId/:id', authorize('farmer', 'trader'), orderController.getById);

// Update order status (seller)
router.put('/:id/status', authorize('farmer', 'trader'), orderController.updateStatus);

// Admin routes
router.get('/', authorize('admin'), orderController.getAll);
router.get('/:id', authorize('admin'), orderController.getById);
router.put('/:id', authorize('admin'), orderController.update);

module.exports = router;
