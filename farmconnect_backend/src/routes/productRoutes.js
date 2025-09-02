const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', productController.getAll);
router.get('/search', productController.search);
router.get('/:id', productController.getById);

// Protected routes (require authentication)
router.use(protect);

// Seller routes
router.post('/', authorize('farmer', 'trader'), productController.create);
router.put('/:id', authorize('farmer', 'trader'), productController.update);
router.delete('/:id', authorize('farmer', 'trader'), productController.delete);

// Get products by seller
router.get('/seller/:sellerId', productController.getBySeller);

module.exports = router;
