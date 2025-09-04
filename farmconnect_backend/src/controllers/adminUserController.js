const { User } = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

// GET /api/admin/users
// Query: search, role, status, page, limit
const listUsers = async (req, res) => {
  try {
    const { search = '', role, status, page = 1, limit = 20 } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { phone: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (role) where.role = role;
    if (status) where.status = status;

    const offset = (Number(page) - 1) * Number(limit);

    const { rows, count } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      limit: Number(limit),
      offset,
    });

    res.json({ data: rows, total: count, page: Number(page), limit: Number(limit) });
  } catch (error) {
    logger.error('Admin list users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/admin/users/:id/status
// Body: { status: 'active' | 'suspended' | 'banned', suspendedUntil?, reason? }
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, suspendedUntil, reason } = req.body;

    if (!['active', 'suspended', 'banned'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = status;
    if (status === 'suspended') {
      user.suspendedUntil = suspendedUntil ? new Date(suspendedUntil) : null;
      user.suspendReason = reason || null;
      user.banReason = null;
    } else if (status === 'banned') {
      user.suspendedUntil = null;
      user.suspendReason = null;
      user.banReason = reason || 'Banned permanently';
    } else {
      user.suspendedUntil = null;
      user.suspendReason = null;
      user.banReason = null;
    }

    await user.save();
    const u = user.toJSON();
    delete u.password;
    res.json({ message: 'Status updated', user: u });
  } catch (error) {
    logger.error('Admin update user status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent self-delete of the current admin
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    logger.error('Admin delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { listUsers, updateUserStatus, deleteUser };
