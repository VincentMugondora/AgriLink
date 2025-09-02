const { Client } = require('pg');
const config = require('../src/config/config.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const client = new Client({
  user: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
});

async function enablePostGIS() {
  try {
    await client.connect();
    console.log('Connected to database successfully');

    // Check if PostGIS is available
    const checkResult = await client.query(
      "SELECT name FROM pg_available_extensions WHERE name = 'postgis'"
    );

    if (checkResult.rows.length === 0) {
      console.error('\nERROR: PostGIS extension is not available in your PostgreSQL installation.');
      console.log('\nTo install PostGIS on Windows:');
      console.log('1. Close this application');
      console.log('2. Open "Application Stack Builder" (search for it in the Start menu)');
      console.log('3. Select your PostgreSQL installation');
      console.log('4. Under "Spatial Extensions", select "PostGIS"');
      console.log('5. Follow the installation wizard');
      console.log('6. Run this script again after installation');
      process.exit(1);
    }

    // Enable PostGIS extension
    console.log('Enabling PostGIS extension...');
    await client.query('CREATE EXTENSION IF NOT EXISTS postgis');
    
    // Verify installation
    const verifyResult = await client.query(
      "SELECT postgis_version() AS version"
    );
    
    console.log('✅ PostGIS has been enabled successfully!');
    console.log(`   Version: ${verifyResult.rows[0].version}`);
    
  } catch (error) {
    console.error('\nError enabling PostGIS:', error.message);
    
    if (error.message.includes('permission denied')) {
      console.log('\nYou need superuser privileges to enable extensions.');
      console.log('Try running this command in psql as a superuser:');
      console.log(`  psql -U postgres -d ${dbConfig.database} -c "CREATE EXTENSION IF NOT EXISTS postgis;"`);
    }
    
    process.exit(1);
  } finally {
    await client.end();
    process.exit(0);
  }
}

enablePostGIS();
