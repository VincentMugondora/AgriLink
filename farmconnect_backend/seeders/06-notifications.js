'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    
    return queryInterface.bulkInsert('Notifications', [
      // Order status updates
      {
        id: '50000000-0000-4000-a000-000000000001',
        type: 'order_placed',
        title: 'New Order Received',
        message: 'You have received a new order #30000000-0000-4000-a000-000000000001 for 50kg of Maize',
        isRead: true,
        readAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        actionUrl: '/orders/30000000-0000-4000-a000-000000000001',
        userId: '00000000-0000-4000-a000-000000000002', // Farmer One
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      },
      {
        id: '50000000-0000-4000-a000-000000000002',
        type: 'order_delivered',
        title: 'Order Delivered',
        message: 'Your order #30000000-0000-4000-a000-000000000001 has been delivered',
        isRead: true,
        readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        actionUrl: '/orders/30000000-0000-4000-a000-000000000001',
        userId: '00000000-0000-4000-a000-000000000003', // Buyer One
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      // Payment notifications
      {
        id: '50000000-0000-4000-a000-000000000003',
        type: 'payment_received',
        title: 'Payment Received',
        message: 'Payment of $11,875.00 has been credited to your wallet for order #30000000-0000-4000-a000-000000000001',
        isRead: false,
        actionUrl: '/transactions/40000000-0000-4000-a000-000000000003',
        userId: '00000000-0000-4000-a000-000000000002', // Farmer One
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      // KYC status update
      {
        id: '50000000-0000-4000-a000-000000000004',
        type: 'kyc_approved',
        title: 'KYC Approved',
        message: 'Your KYC verification has been approved. You can now receive payments.',
        isRead: true,
        readAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        actionUrl: '/profile/verification',
        userId: '00000000-0000-4000-a000-000000000002', // Farmer One
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      },
      // Price alert
      {
        id: '50000000-0000-4000-a000-000000000005',
        type: 'price_alert',
        title: 'Price Alert: Maize',
        message: 'The price of Maize has reached your target of $250.00 per kg',
        isRead: false,
        actionUrl: '/products/20000000-0000-4000-a000-000000000001',
        userId: '00000000-0000-4000-a000-000000000003', // Buyer One
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
        createdAt: now,
        updatedAt: now,
      },
      // System notification
      {
        id: '50000000-0000-4000-a000-000000000006',
        type: 'system',
        title: 'Scheduled Maintenance',
        message: 'The platform will be down for maintenance on 2023-09-15 from 00:00 to 04:00 UTC',
        isRead: false,
        userId: '00000000-0000-4000-a000-000000000001', // Admin
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notifications', null, {});
  }
};
