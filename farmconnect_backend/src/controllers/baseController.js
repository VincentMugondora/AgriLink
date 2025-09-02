const { Op } = require('sequelize');

class BaseController {
  constructor(model) {
    this.model = model;
  }

  // Get all records with pagination, filtering, and sorting
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', ...filters } = req.query;
      
      // Build where clause
      const where = {};
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          if (key.endsWith('_like')) {
            const field = key.replace('_like', '');
            where[field] = { [Op.like]: `%${value}%` };
          } else if (key.endsWith('_in')) {
            const field = key.replace('_in', '');
            where[field] = { [Op.in]: value.split(',') };
          } else {
            where[key] = value;
          }
        }
      }

      // Handle date ranges
      if (filters.startDate && filters.endDate) {
        where.createdAt = {
          [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
        };
        delete where.startDate;
        delete where.endDate;
      }

      // Include associations if specified
      const include = this.getIncludes(req);

      const { count, rows } = await this.model.findAndCountAll({
        where,
        include,
        order: [[sortBy, sortOrder]],
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });

      res.json({
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      console.error(`Error fetching ${this.model.name}:`, error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Get single record by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const include = this.getIncludes(req);
      const record = await this.model.findByPk(id, { include });

      if (!record) {
        return res.status(404).json({ message: `${this.model.name} not found` });
      }

      res.json(record);
    } catch (error) {
      console.error(`Error fetching ${this.model.name}:`, error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Create new record
  async create(req, res) {
    try {
      const record = await this.model.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      console.error(`Error creating ${this.model.name}:`, error);
      res.status(400).json({ message: error.message });
    }
  }

  // Update record by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const record = await this.model.findByPk(id);

      if (!record) {
        return res.status(404).json({ message: `${this.model.name} not found` });
      }

      await record.update(req.body);
      res.json(record);
    } catch (error) {
      console.error(`Error updating ${this.model.name}:`, error);
      res.status(400).json({ message: error.message });
    }
  }

  // Delete record by ID
  async delete(req, res) {
    try {
      const { id } = req.params;
      const record = await this.model.findByPk(id);

      if (!record) {
        return res.status(404).json({ message: `${this.model.name} not found` });
      }

      await record.destroy();
      res.json({ message: `${this.model.name} deleted successfully` });
    } catch (error) {
      console.error(`Error deleting ${this.model.name}:`, error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // Override this method in child controllers to include associations
  getIncludes() {
    return [];
  }
}

module.exports = BaseController;
