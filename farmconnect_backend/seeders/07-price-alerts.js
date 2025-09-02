'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    
    return queryInterface.bulkInsert('PriceAlerts', [
      // Active price alert
      {
        id: '60000000-0000-4000-a000-000000000001',
        productName: 'Maize',
        category: 'cereals',
        condition: 'below',
        targetPrice: 200.00,
        currency: 'USD',
        unit: 'kg',
        isActive: true,
        lastTriggeredAt: null,
        triggerCount: 0,
        userId: '00000000-0000-4000-a000-000000000003', // Buyer One
        createdAt: now,
        updatedAt: now,
      },
      // Triggered price alert
      {
        id: '60000000-0000-4000-a000-000000000002',
        productName: 'Tomatoes',
        category: 'vegetables',
        condition: 'below',
        targetPrice: 150.00,
        currency: 'USD',
        unit: 'kg',
        isActive: true,
        lastTriggeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        triggerCount: 3,
        userId: '00000000-0000-4000-a000-000000000003', // Buyer One
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      // Inactive price alert
      {
        id: '60000000-0000-4000-a000-000000000003',
        productName: 'Beef',
        category: 'livestock',
        condition: 'below',
        targetPrice: 400.00,
        currency: 'USD',
        unit: 'kg',
        isActive: false,
        lastTriggeredAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        triggerCount: 5,
        userId: '00000000-0000-4000-a000-000000000003', // Buyer One
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      },
      // Price alert for a different user
      {
        id: '60000000-0000-4000-a000-000000000004',
        productName: 'Eggs',
        category: 'poultry',
        condition: 'below',
        targetPrice: 20.00,
        currency: 'USD',
        unit: 'dozen',
        isActive: true,
        lastTriggeredAt: null,
        triggerCount: 0,
        userId: '00000000-0000-4000-a000-000000000002', // Farmer One
        createdAt: now,
        updatedAt: now,
      },
      // Price alert for a different product
      {
        id: '60000000-0000-4000-a000-000000000005',
        productName: 'Wheat',
        category: 'cereals',
        condition: 'below',
        targetPrice: 180.00,
        currency: 'USD',
        unit: 'kg',
        isActive: true,
        lastTriggeredAt: null,
        triggerCount: 0,
        userId: '00000000-0000-4000-a000-000000000003', // Buyer One
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PriceAlerts', null, {});
  }
};
