const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { listUsers, updateUserStatus, deleteUser } = require('../controllers/adminUserController');

// Admin-only
router.use(protect, authorize('admin'));

// Users management
router.get('/users', listUsers);
router.patch('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);

module.exports = router;
