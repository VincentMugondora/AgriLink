const { Pool } = require('pg');
require('dotenv').config();

console.log('Testing PostgreSQL connection...');
console.log('Environment Variables:', {
  DB_USER: process.env.DB_USER || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'farmconnect_dev',
  DB_PORT: process.env.DB_PORT || 5432,
  NODE_ENV: process.env.NODE_ENV || 'development'
});

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'farmconnect_dev',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  const client = await pool.connect();
  try {
    console.log('Connected to PostgreSQL server');
    const res = await client.query('SELECT $1::text as message', ['Connection successful!']);
    console.log('Query result:', res.rows[0].message);
    
    // Check if the database exists
    const dbCheck = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1", 
      [process.env.DB_NAME || 'farmconnect_dev']
    );
    
    if (dbCheck.rows.length > 0) {
      console.log(`Database ${process.env.DB_NAME || 'farmconnect_dev'} exists`);
    } else {
      console.log(`Database ${process.env.DB_NAME || 'farmconnect_dev'} does not exist`);
    }
    
    // List all tables
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log('Tables in database:', tables.rows.map(r => r.table_name).join(', '));
    
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    client.release();
    await pool.end();
    process.exit(0);
  }
}

testConnection();
