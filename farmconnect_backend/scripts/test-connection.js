const { Pool } = require('pg');
require('dotenv').config();

console.log('Attempting to connect to PostgreSQL with these settings:');
console.log({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD ? '***' : 'not set'
});

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 1000,
});

async function testConnection() {
  let client;
  try {
    client = await pool.connect();
    const res = await client.query('SELECT $1::text as message', ['Connection successful!']);
    console.log(res.rows[0].message);
    
    // List all databases
    const dbs = await client.query('SELECT datname FROM pg_database');
    console.log('\nAvailable databases:');
    console.log(dbs.rows.map(r => r.datname).join('\n'));
    
  } catch (err) {
    console.error('Connection error:', err.message);
    console.error('Error code:', err.code);
    console.error('Error stack:', err.stack);
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

testConnection();
