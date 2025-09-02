'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    
    return queryInterface.bulkInsert('Products', [
      // Farmer One's products
      {
        id: '20000000-0000-4000-a000-000000000001',
        name: 'Maize',
        description: 'High quality white maize, Grade A',
        category: 'cereals',
        grade: 'A',
        pricePerUnit: 250.00,
        unit: 'kg',
        quantity: 1000,
        availableQuantity: 1000,
        location: {
          type: 'Point',
          coordinates: [31.053028, -17.824858],
        },
        harvestDate: new Date('2023-06-15'),
        isOrganic: true,
        status: 'available',
        images: [
          'https://example.com/products/maize1.jpg',
          'https://example.com/products/maize2.jpg'
        ],
        sellerId: '00000000-0000-4000-a000-000000000002', // Farmer One
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '20000000-0000-4000-a000-000000000002',
        name: 'Tomatoes',
        description: 'Fresh red tomatoes, Grade A',
        category: 'vegetables',
        grade: 'A',
        pricePerUnit: 120.00,
        unit: 'kg',
        quantity: 200,
        availableQuantity: 200,
        location: {
          type: 'Point',
          coordinates: [31.063028, -17.834858], // Near Harare
        },
        harvestDate: new Date('2023-07-01'),
        isOrganic: false,
        status: 'available',
        images: [
          'https://example.com/products/tomatoes1.jpg'
        ],
        sellerId: '00000000-0000-4000-a000-000000000002', // Farmer One
        createdAt: now,
        updatedAt: now,
      },
      // More products
      {
        id: '20000000-0000-4000-a000-000000000003',
        name: 'Beef',
        description: 'Premium quality beef, Grade A',
        category: 'livestock',
        grade: 'A',
        pricePerUnit: 450.00,
        unit: 'kg',
        quantity: 500,
        availableQuantity: 500,
        location: {
          type: 'Point',
          coordinates: [31.123456, -17.789012], // Another location
        },
        isOrganic: true,
        status: 'available',
        images: [
          'https://example.com/products/beef1.jpg'
        ],
        sellerId: '00000000-0000-4000-a000-000000000004', // Trader One
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '20000000-0000-4000-a000-000000000004',
        name: 'Eggs',
        description: 'Farm fresh eggs, Grade A',
        category: 'poultry',
        grade: 'A',
        pricePerUnit: 25.00,
        unit: 'dozen',
        quantity: 100,
        availableQuantity: 100,
        location: {
          type: 'Point',
          coordinates: [31.143456, -17.809012],
        },
        isOrganic: true,
        status: 'available',
        images: [
          'https://example.com/products/eggs1.jpg'
        ],
        sellerId: '00000000-0000-4000-a000-000000000004', // Trader One
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
