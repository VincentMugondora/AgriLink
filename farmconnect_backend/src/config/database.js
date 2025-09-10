const { Sequelize } = require('sequelize');
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'farmconnect_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: (msg) => {
      console.log(`[Sequelize] ${msg}`);
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 3
    }
  },
  test: {
    username: process.env.TEST_DB_USER || 'postgres',
    password: process.env.TEST_DB_PASSWORD || 'postgres',
    database: process.env.TEST_DB_NAME || 'farmconnect_test',
    host: process.env.TEST_DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

const dbConfig = config[env];

let sequelize;
// Prefer DATABASE_URL (or configured env var) only when it is actually defined; otherwise fall back
const connectionUri = dbConfig.use_env_variable ? process.env[dbConfig.use_env_variable] : null;
if (connectionUri && typeof connectionUri === 'string' && connectionUri.trim().length > 0) {
  sequelize = new Sequelize(connectionUri, {
    dialect: dbConfig.dialect || 'postgres',
    logging: false,
    ...(dbConfig.dialectOptions && { dialectOptions: dbConfig.dialectOptions })
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
      ...(dbConfig.pool && { pool: dbConfig.pool }),
      ...(dbConfig.retry && { retry: dbConfig.retry })
    }
  );
}
module.exports = {
  sequelize,
  Sequelize,
};
