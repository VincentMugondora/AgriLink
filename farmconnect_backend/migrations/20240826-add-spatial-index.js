'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Enable PostGIS extension (requires superuser privileges)
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis');

    // Create a spatial GIST index directly on the GEOMETRY column
    // Modern PostGIS provides a default operator class, so we don't specify gist_geometry_ops
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS products_location_gist 
      ON "Products" USING GIST ("location");
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the spatial index
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS products_location_gist;'
    );
  }
};

