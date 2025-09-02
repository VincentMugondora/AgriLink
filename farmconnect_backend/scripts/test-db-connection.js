const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT $1::text as message', ['Database connection successful!']);
    console.log(res.rows[0].message);
    
    // Check if database exists
    const dbCheck = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1", 
      [process.env.DB_NAME || 'farmconnect_dev']
    );
    
    if (dbCheck.rows.length > 0) {
      console.log(`Database ${process.env.DB_NAME || 'farmconnect_dev'} exists`);
    } else {
      console.log(`Database ${process.env.DB_NAME || 'farmconnect_dev'} does not exist`);
    }
    
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

testConnection();
