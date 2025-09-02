'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    
    return queryInterface.bulkInsert('Transactions', [
      // Deposit
      {
        id: '40000000-0000-4000-a000-000000000001',
        amount: 15000.00,
        currency: 'USD',
        type: 'deposit',
        status: 'completed',
        paymentMethod: 'ecocash',
        paymentReference: 'ECOCASH-123456789',
        description: 'Wallet top-up',
        processedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        userId: '00000000-0000-4000-a000-000000000003', 
        orderId: null,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
      // Order payment (escrow hold)
      {
        id: '40000000-0000-4000-a000-000000000002',
        amount: 12500.00,
        currency: 'USD',
        type: 'escrow_hold',
        status: 'completed',
        paymentMethod: 'wallet',
        description: 'Payment for Order #30000000-0000-4000-a000-000000000001',
        processedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        userId: '00000000-0000-4000-a000-000000000003', // Buyer One
        orderId: '30000000-0000-4000-a000-000000000001',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      },
      // Order payment (escrow release to seller)
      {
        id: '40000000-0000-4000-a000-000000000003',
        amount: 11875.00, // 5% platform fee
        currency: 'USD',
        type: 'escrow_release',
        status: 'completed',
        paymentMethod: 'wallet',
        description: 'Payout for Order #30000000-0000-4000-a000-000000000001',
        processedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        userId: '00000000-0000-4000-a000-000000000002', // Farmer One (seller)
        orderId: '30000000-0000-4000-a000-000000000001',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      // Platform fee
      {
        id: '40000000-0000-4000-a000-000000000004',
        amount: 625.00, // 5% of 12500
        currency: 'USD',
        type: 'fee',
        status: 'completed',
        paymentMethod: 'wallet',
        description: 'Platform fee for Order #30000000-0000-4000-a000-000000000001',
        processedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        userId: '00000000-0000-4000-a000-000000000003', // Buyer One
        orderId: '30000000-0000-4000-a000-000000000001',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      // Pending withdrawal
      {
        id: '40000000-0000-4000-a000-000000000005',
        amount: 10000.00,
        currency: 'USD',
        type: 'withdrawal',
        status: 'processing',
        paymentMethod: 'ecocash',
        paymentReference: 'WITHDRAW-987654321',
        description: 'Withdrawal to EcoCash',
        userId: '00000000-0000-4000-a000-000000000002', // Farmer One
        orderId: null,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
