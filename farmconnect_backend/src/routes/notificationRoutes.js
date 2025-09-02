const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

// Protected routes (require authentication)
router.use(protect);

// User notification routes
router.get('/user/:userId', notificationController.getByUser);
router.get('/unread/count/:userId', notificationController.getUnreadCount);
router.put('/read/:id', notificationController.markAsRead);
router.put('/read-all/:userId', notificationController.markAllAsRead);
router.delete('/expired/:userId', notificationController.deleteExpired);

// Admin routes (if needed)
// router.post('/', authorize('admin'), notificationController.create);

module.exports = router;
