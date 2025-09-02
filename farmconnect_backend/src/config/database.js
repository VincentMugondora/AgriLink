const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Environment Variables:');
console.log({
  DB_USER: process.env.DB_USER ? '***' : 'Not set',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'farmconnect_dev',
  DB_PORT: process.env.DB_PORT || 5432,
  NODE_ENV: process.env.NODE_ENV || 'development'
});

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
console.log('Database Configuration:', {
  ...dbConfig,
  password: dbConfig.password ? '***' : 'Not set'
});

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    retry: dbConfig.retry,
    ...(env === 'production' && dbConfig.dialectOptions && { dialectOptions: dbConfig.dialectOptions })
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

testConnection().then(success => {
  if (!success) process.exit(1);
});

module.exports = {
  sequelize,
  Sequelize,
};
