require('dotenv').config();
const { sequelize } = require('../src/config/database');
const logger = console;

// Ensure models are registered
require('../src/models');

(async () => {
  try {
    logger.log('[postdeploy] Authenticating to database...');
    await sequelize.authenticate();
    logger.log('[postdeploy] Connected. Enabling PostGIS (if not already)...');
    await sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis');

    logger.log('[postdeploy] Running Sequelize sync to create/update tables...');
    // For initial production setup. Safe on empty DBs. On existing DBs, consider migrations.
    await sequelize.sync();

    logger.log('[postdeploy] Ensuring spatial index on Products.location...');
    await sequelize.query('CREATE INDEX IF NOT EXISTS products_location_gist ON "Products" USING GIST ("location");');

    logger.log('[postdeploy] Done.');
    process.exit(0);
  } catch (err) {
    logger.error('[postdeploy] Failed:', err);
    process.exit(1);
  }
})();
