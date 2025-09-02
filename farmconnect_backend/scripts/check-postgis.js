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

async function checkPostGIS() {
  try {
    await client.connect();
    console.log('Connected to database successfully');
    
    // Check if PostGIS is installed
    const result = await client.query(
      "SELECT name, default_version, installed_version FROM pg_available_extensions WHERE name = 'postgis'"
    );

    if (result.rows.length === 0) {
      console.log('PostGIS extension is not available. You need to install it first.');
      console.log('\nTo install PostGIS on Windows:');
      console.log('1. Open "Application Stack Builder" that came with your PostgreSQL installation');
      console.log('2. Select your PostgreSQL installation');
      console.log('3. Under "Spatial Extensions", select "PostGIS"');
      console.log('4. Follow the installation wizard');
      console.log('5. After installation, run: npm run db:enable-postgis');
    } else {
      const ext = result.rows[0];
      console.log(`PostGIS is available (version: ${ext.installed_version || 'not installed'})`);
      
      if (!ext.installed_version) {
        console.log('\nPostGIS is available but not installed in this database.');
        console.log('To install it, run: npm run db:enable-postgis');
      }
    }
  } catch (error) {
    console.error('Error checking PostGIS:', error.message);
  } finally {
    await client.end();
  }
}

checkPostGIS();
