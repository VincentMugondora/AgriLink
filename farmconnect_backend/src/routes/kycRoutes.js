const express = require('express');
const router = express.Router();
const kycController = require('../controllers/kycController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes (require authentication)
router.use(protect);

// User routes
router.post('/', authorize('buyer', 'farmer', 'trader'), kycController.create);
router.get('/status/:userId', kycController.getKycStatus);

// Admin routes
router.get('/', authorize('admin'), kycController.getKycDocuments);
router.put('/:id/status', authorize('admin'), kycController.updateStatus);

module.exports = router;
