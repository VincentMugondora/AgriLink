const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes (require authentication)
router.use(protect);

// User routes
router.post('/', authorize('buyer', 'farmer', 'trader'), transactionController.create);
router.get('/user/:userId', authorize('buyer', 'farmer', 'trader'), transactionController.getByUser);
router.get('/wallet/:userId', authorize('buyer', 'farmer', 'trader'), transactionController.getWalletBalance);

// Admin routes
router.get('/', authorize('admin'), transactionController.getAll);
router.get('/:id', authorize('admin'), transactionController.getById);

module.exports = router;
