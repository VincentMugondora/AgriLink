'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('password123', 10);
    const now = new Date();
    
    return queryInterface.bulkInsert('Users', [
      // Admin user
      {
        id: '00000000-0000-4000-a000-000000000001',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@agrilink.com',
        phone: '+263771000001',
        password,
        role: 'admin',
        isVerified: true,
        kycStatus: 'verified',
        language: 'en',
        createdAt: now,
        updatedAt: now,
      },
      // Farmer user
      {
        id: '00000000-0000-4000-a000-000000000002',
        firstName: 'Farmer',
        lastName: 'One',
        email: 'farmer@example.com',
        phone: '+263772000002',
        password,
        role: 'farmer',
        isVerified: true,
        kycStatus: 'verified',
        location: {
          type: 'Point',
          coordinates: [31.053028, -17.824858], // Harare coordinates
        },
        language: 'sn',
        createdAt: now,
        updatedAt: now,
      },
      // Buyer user
      {
        id: '00000000-0000-4000-a000-000000000003',
        firstName: 'Buyer',
        lastName: 'One',
        email: 'buyer@example.com',
        phone: '+263773000003',
        password,
        role: 'buyer',
        isVerified: true,
        kycStatus: 'verified',
        location: {
          type: 'Point',
          coordinates: [31.033333, -17.816667], // Harare CBD
        },
        language: 'en',
        createdAt: now,
        updatedAt: now,
      },
      // Trader user
      {
        id: '00000000-0000-4000-a000-000000000004',
        firstName: 'Trader',
        lastName: 'One',
        email: 'trader@example.com',
        phone: '+263774000004',
        password,
        role: 'trader',
        isVerified: true,
        kycStatus: 'pending',
        language: 'nd',
        createdAt: now,
        updatedAt: now,
      },
      // Unverified user
      {
        id: '00000000-0000-4000-a000-000000000005',
        firstName: 'Unverified',
        lastName: 'User',
        email: 'unverified@example.com',
        phone: '+263775000005',
        password,
        role: 'farmer',
        isVerified: false,
        kycStatus: 'pending',
        language: 'en',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
