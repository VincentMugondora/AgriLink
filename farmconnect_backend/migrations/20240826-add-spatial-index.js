'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, let's create a function to check if the extension exists
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION create_extension_if_not_exists(extname text)
      RETURNS BOOLEAN AS $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = $1) THEN
          EXECUTE format('CREATE EXTENSION %I', $1);
          RETURN TRUE;
        END IF;
        RETURN FALSE;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Create the PostGIS extension if it doesn't exist
    await queryInterface.sequelize.query(
      'SELECT create_extension_if_not_exists(\'postgis\')'
    );

    // Now create the spatial index with the correct operator class
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS products_location_gist 
      ON "Products" USING GIST (
        (location->'coordinates')::geometry(POINT, 4326)
      );
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the spatial index
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS products_location_gist;'
    );
  }
};
