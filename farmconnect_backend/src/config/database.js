const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'farmconnect_dev',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: console.log,
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

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    ...(env === 'production' && dbConfig.dialectOptions && { dialectOptions: dbConfig.dialectOptions })
  }
);

module.exports = {
  sequelize,
  Sequelize,
};
