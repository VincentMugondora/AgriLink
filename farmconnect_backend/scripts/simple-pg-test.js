const { Pool } = require('pg');

console.log('Starting PostgreSQL connection test...');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farmconnect_dev',
  password: 'vin12345>',
  port: 5432,
});

async function testConnection() {
  let client;
  try {
    console.log('Attempting to connect to PostgreSQL...');
    client = await pool.connect();
    console.log('Successfully connected to PostgreSQL!');
    
    const result = await client.query('SELECT NOW() as now');
    console.log('Current database time:', result.rows[0].now);
    
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log('\nTables in database:');
    console.table(tables.rows);
    
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } finally {
    if (client) client.release();
    await pool.end();
    console.log('Connection closed.');
  }
}

testConnection();
