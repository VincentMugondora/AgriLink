'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    
    return queryInterface.bulkInsert('KycDocuments', [
      // Farmer One's KYC
      {
        id: '10000000-0000-4000-a000-000000000001',
        documentType: 'national_id',
        documentNumber: '63-1234567X01',
        frontImageUrl: 'https://example.com/kyc/farmer1-front.jpg',
        backImageUrl: 'https://example.com/kyc/farmer1-back.jpg',
        selfieImageUrl: 'https://example.com/kyc/farmer1-selfie.jpg',
        status: 'verified',
        verifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        verifiedBy: '00000000-0000-4000-a000-000000000001', // Admin user
        userId: '00000000-0000-4000-a000-000000000002', // Farmer One
        expiryDate: new Date('2030-12-31'),
        createdAt: now,
        updatedAt: now,
      },
      // Buyer One's KYC
      {
        id: '10000000-0000-4000-a000-000000000002',
        documentType: 'passport',
        documentNumber: 'ZP1234567',
        frontImageUrl: 'https://example.com/kyc/buyer1-passport.jpg',
        selfieImageUrl: 'https://example.com/kyc/buyer1-selfie.jpg',
        status: 'verified',
        verifiedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        verifiedBy: '00000000-0000-4000-a000-000000000001', // Admin user
        userId: '00000000-0000-4000-a000-000000000003', // Buyer One
        expiryDate: new Date('2028-06-30'),
        createdAt: now,
        updatedAt: now,
      },
      // Trader One's KYC (pending)
      {
        id: '10000000-0000-4000-a000-000000000003',
        documentType: 'national_id',
        documentNumber: '63-7654321X02',
        frontImageUrl: 'https://example.com/kyc/trader1-front.jpg',
        backImageUrl: 'https://example.com/kyc/trader1-back.jpg',
        selfieImageUrl: 'https://example.com/kyc/trader1-selfie.jpg',
        status: 'pending',
        userId: '00000000-0000-4000-a000-000000000004', // Trader One
        expiryDate: new Date('2031-12-31'),
        createdAt: now,
        updatedAt: now,
      },
      // Rejected KYC (for testing)
      {
        id: '10000000-0000-4000-a000-000000000004',
        documentType: 'national_id',
        documentNumber: '63-1111111X03',
        frontImageUrl: 'https://example.com/kyc/rejected-front.jpg',
        backImageUrl: 'https://example.com/kyc/rejected-back.jpg',
        status: 'rejected',
        rejectionReason: 'Document images are not clear',
        verifiedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        verifiedBy: '00000000-0000-4000-a000-000000000001', // Admin user
        userId: '00000000-0000-4000-a000-000000000005', // Unverified user
        expiryDate: new Date('2029-12-31'),
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('KycDocuments', null, {});
  }
};
