'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add status enum and moderation columns to Users
    await queryInterface.addColumn('Users', 'status', {
      type: Sequelize.ENUM('active', 'suspended', 'banned'),
      allowNull: false,
      defaultValue: 'active',
    });

    await queryInterface.addColumn('Users', 'suspendedUntil', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'suspendReason', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'banReason', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'banReason');
    await queryInterface.removeColumn('Users', 'suspendReason');
    await queryInterface.removeColumn('Users', 'suspendedUntil');
    await queryInterface.removeColumn('Users', 'status');

    // Drop enum type in Postgres (Sequelize automatically creates it)
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_status";');
    }
  }
};
