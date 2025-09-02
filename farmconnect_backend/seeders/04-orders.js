'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);
    
    return queryInterface.bulkInsert('Orders', [
      // Completed order
      {
        id: '30000000-0000-4000-a000-000000000001',
        quantity: 50,
        unitPrice: 250.00,
        totalPrice: 12500.00,
        status: 'delivered',
        paymentMethod: 'ecocash',
        paymentStatus: 'completed',
        deliveryAddress: '123 Business Park, Harare, Zimbabwe',
        deliveryInstructions: 'Leave at reception',
        estimatedDeliveryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        actualDeliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        buyerId: '00000000-0000-4000-a000-000000000003', // Buyer One
        sellerId: '00000000-0000-4000-a000-000000000002', // Farmer One
        productId: '20000000-0000-4000-a000-000000000001', // Maize
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      // Pending order
      {
        id: '30000000-0000-4000-a000-000000000002',
        quantity: 10,
        unitPrice: 120.00,
        totalPrice: 1200.00,
        status: 'pending',
        paymentMethod: 'bank_transfer',
        paymentStatus: 'pending',
        deliveryAddress: '456 Market Street, Harare, Zimbabwe',
        buyerId: '00000000-0000-4000-a000-000000000003', // Buyer One
        sellerId: '00000000-0000-4000-a000-000000000002', // Farmer One
        productId: '20000000-0000-4000-a000-000000000002', // Tomatoes
        createdAt: now,
        updatedAt: now,
      },
      // In-progress order
      {
        id: '30000000-0000-4000-a000-000000000003',
        quantity: 5,
        unitPrice: 450.00,
        totalPrice: 2250.00,
        status: 'paid',
        paymentMethod: 'ecocash',
        paymentStatus: 'completed',
        deliveryAddress: '789 Office Park, Harare, Zimbabwe',
        estimatedDeliveryDate: oneWeekFromNow,
        buyerId: '00000000-0000-4000-a000-000000000003', // Buyer One
        sellerId: '00000000-0000-4000-a000-000000000004', // Trader One
        productId: '20000000-0000-4000-a000-000000000003', // Beef
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      },
      // Rejected order
      {
        id: '30000000-0000-4000-a000-000000000004',
        quantity: 2,
        unitPrice: 25.00,
        totalPrice: 50.00,
        status: 'rejected',
        paymentMethod: 'ecocash',
        paymentStatus: 'failed',
        buyerId: '00000000-0000-4000-a000-000000000003', // Buyer One
        sellerId: '00000000-0000-4000-a000-000000000004', // Trader One
        productId: '20000000-0000-4000-a000-000000000004', // Eggs
        notes: 'Out of stock',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
