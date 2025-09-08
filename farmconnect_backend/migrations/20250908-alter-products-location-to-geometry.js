'use strict';

module.exports = {
  up: async (context, Sequelize) => {
    const { queryInterface } = context;

    // Ensure PostGIS extension is enabled
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis');

    // Drop existing index if it exists (type may be wrong before altering)
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS products_location_gist;');

    // Alter column from JSONB to GEOMETRY(Point, 4326). Convert existing JSON to geometry.
    await queryInterface.sequelize.query(`
      ALTER TABLE "Products"
      ALTER COLUMN "location" TYPE geometry(Point, 4326)
      USING 
        CASE 
          WHEN "location" IS NULL THEN NULL
          ELSE ST_SetSRID(ST_GeomFromGeoJSON("location"::text), 4326)
        END;
    `);

    // Create spatial GIST index on location
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS products_location_gist 
      ON "Products" USING GIST ("location");
    `);
  },

  down: async (context, Sequelize) => {
    const { queryInterface } = context;

    // Drop the spatial index
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS products_location_gist;');

    // Convert back to JSONB if needed
    await queryInterface.sequelize.query(`
      ALTER TABLE "Products"
      ALTER COLUMN "location" TYPE jsonb
      USING 
        CASE 
          WHEN "location" IS NULL THEN NULL
          ELSE ST_AsGeoJSON("location")::jsonb
        END;
    `);
  }
};
