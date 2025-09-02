console.log('Starting PostGIS check...');

const { Client } = require('pg');

const client = new Client({
  user: 'postgres',  // Default superuser
  password: process.env.DB_PASSWORD || 'vin12345>', // Replace with your password or use environment variable
  host: 'localhost',
  port: 5432,
  database: 'farmconnect_dev',
});

async function checkPostGIS() {
  try {
    console.log('Attempting to connect to database...');
    await client.connect();
    console.log('Connected to database successfully');
    
    // Simple query to check connection
    const res = await client.query('SELECT version()');
    console.log('PostgreSQL version:', res.rows[0].version);
    
    // Check if PostGIS is available
    const result = await client.query(
      "SELECT name, default_version, installed_version FROM pg_available_extensions WHERE name = 'postgis'"
    );

    if (result.rows.length === 0) {
      console.log('\nPostGIS extension is not available in your PostgreSQL installation.');
      console.log('\nTo install PostGIS on Windows:');
      console.log('1. Close this application');
      console.log('2. Open "Application Stack Builder" from the Start menu');
      console.log('3. Select your PostgreSQL installation');
      console.log('4. Under "Spatial Extensions", select "PostGIS"');
      console.log('5. Follow the installation wizard');
    } else {
      const ext = result.rows[0];
      console.log(`\nPostGIS is available (version: ${ext.installed_version || 'not installed'})`);
      
      if (!ext.installed_version) {
        console.log('\nTo install PostGIS in your database, run:');
        console.log('  psql -U postgres -d farmconnect_dev -c "CREATE EXTENSION postgis;"');
      } else {
        console.log('PostGIS is already installed in this database.');
      }
    }
  } catch (error) {
    console.error('\nError:', error.message);
    
    if (error.message.includes('password authentication failed')) {
      console.log('\nAuthentication failed. Please check your PostgreSQL username and password.');
      console.log('You may need to modify the script with your PostgreSQL credentials.');
    } else if (error.message.includes('does not exist')) {
      console.log('\nDatabase does not exist. Make sure the database is created first.');
    }
  } finally {
    await client.end();
  }
}

checkPostGIS();
