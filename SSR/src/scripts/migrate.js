const fs = require('fs');
const path = require('path');
const pool = require('../db/connection');

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database migrations...');
    
    const schemaDir = path.join(__dirname, '../db/schema');
    const schemaFiles = [
      'students.sql',
      'counselors.sql', 
      'assessments.sql',
      'counselor_access_log.sql'
    ];
    
    for (const file of schemaFiles) {
      const filePath = path.join(schemaDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      console.log(`Running migration: ${file}`);
      await client.query(sql);
      console.log(`✓ ${file} completed`);
    }
    
    console.log('All migrations completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();