const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', productController.getAll);
router.get('/search', productController.search);
// Protect this specific route but keep it above '/:id' to avoid shadowing
router.get('/seller/:sellerId', protect, productController.getBySeller);
router.get('/:id', productController.getById);

// Protected routes (require authentication)
router.use(protect);

// Seller routes
router.post('/', authorize('farmer', 'trader'), productController.create);
router.put('/:id', authorize('farmer', 'trader'), productController.update);
router.delete('/:id', authorize('farmer', 'trader'), productController.delete);

module.exports = router;
