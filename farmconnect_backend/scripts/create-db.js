const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Connect to default postgres database
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function createDatabase() {
  try {
    // Create database if it doesn't exist
    await pool.query(`CREATE DATABASE ${process.env.DB_NAME || 'farmconnect_dev'}`);
    console.log(`Database ${process.env.DB_NAME || 'farmconnect_dev'} created successfully`);
  } catch (err) {
    if (err.code === '42P04') {
      console.log('Database already exists');
    } else {
      console.error('Error creating database:', err);
      process.exit(1);
    }
  } finally {
    await pool.end();
  }
}

createDatabase();
