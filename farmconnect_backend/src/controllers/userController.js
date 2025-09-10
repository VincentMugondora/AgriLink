const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');
const logger = require('../utils/logger');
const Joi = require('joi');
const { Op } = require('sequelize');

// Validation schema for user registration
const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('farmer', 'buyer', 'trader', 'admin').required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validation schema for profile update (at least one field required)
const updateProfileSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  language: Joi.string().valid('en', 'sn', 'nd'),
}).min(1);

// Validation schema for password change
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    // Validate request body
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { firstName, lastName, email, phone, password, role } = req.body;

    // Check if email or phone already exists
    const existing = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }]
      }
    });
    if (existing) {
      const conflictField = existing.email === email ? 'email' : (existing.phone === phone ? 'phone' : null);
      const message = conflictField === 'email' ? 'Email already in use' : (conflictField === 'phone' ? 'Phone already in use' : 'User already exists');
      return res.status(400).json({ message });
    }

    // Create new user
    let user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      isVerified: false, // Email verification can be implemented later
      kycStatus: 'pending',
    });

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token,
    });
  } catch (error) {
    logger.error('Registration error:', error);
    // Gracefully handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors && error.errors[0] && error.errors[0].path;
      const message = field === 'email' ? 'Email already in use' : (field === 'phone' ? 'Phone already in use' : 'User already exists');
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Enforce moderation state on login
    if (user.status === 'banned') {
      return res.status(403).json({ message: 'Account is banned' });
    }

    if (user.status === 'suspended') {
      const now = new Date();
      if (user.suspendedUntil && now > new Date(user.suspendedUntil)) {
        // Auto-restore if suspension expired
        user.status = 'active';
        user.suspendedUntil = null;
        user.suspendReason = null;
        await user.save();
      } else {
        return res.status(403).json({
          message: 'Account is suspended',
          suspendedUntil: user.suspendedUntil || null,
        });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      message: 'Login successful',
      user: userResponse,
      token,
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Update current user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
  try {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { email, phone } = req.body;

    // Check for duplicate email/phone if being changed
    const orConditions = [];
    if (email && email !== user.email) orConditions.push({ email });
    if (phone && phone !== user.phone) orConditions.push({ phone });

    if (orConditions.length > 0) {
      const existing = await User.findOne({
        where: {
          [Op.and]: [
            { id: { [Op.ne]: user.id } },
            { [Op.or]: orConditions },
          ],
        },
      });
      if (existing) {
        const conflictField = existing.email === email ? 'email' : (existing.phone === phone ? 'phone' : 'user');
        const message = conflictField === 'email' ? 'Email already in use' : (conflictField === 'phone' ? 'Phone already in use' : 'User already exists');
        return res.status(400).json({ message });
      }
    }

    const allowed = ['firstName', 'lastName', 'email', 'phone', 'language'];
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        user[key] = req.body[key];
      }
    }

    await user.save();

    const userResponse = user.toJSON();
    delete userResponse.password;

    return res.json({ message: 'Profile updated successfully', user: userResponse });
  } catch (error) {
    logger.error('Update profile error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors && error.errors[0] && error.errors[0].path;
      const message = field === 'email' ? 'Email already in use' : (field === 'phone' ? 'Phone already in use' : 'User already exists');
      return res.status(400).json({ message });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Change current user password
 * @route   PUT /api/users/change-password
 * @access  Private
 */
const changePassword = async (req, res) => {
  try {
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.validPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword; // Will be hashed by beforeUpdate hook
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    logger.error('Change password error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
};
