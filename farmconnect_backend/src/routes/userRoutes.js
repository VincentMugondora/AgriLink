const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { updateProfile, changePassword } = require('../controllers/userController');

// Update current user's profile
router.put('/profile', protect, updateProfile);

// Change current user's password
router.put('/change-password', protect, changePassword);

module.exports = router;
