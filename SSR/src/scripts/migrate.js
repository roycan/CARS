/**
 * scripts/migrate.js
 * Database migration script
 * Run this to set up the database schema
 * 
 * Usage: npm run migrate
 */

const path = require('path');
const { initDatabase, runMigration } = require('../db/connection');

async function migrate() {
  console.log('🚀 Starting database migration...\n');
  
  try {
    // Initialize database connection
    initDatabase();
    
    // Run schema migration
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    runMigration(schemaPath);
    
    console.log('\n✅ Migration completed successfully!');
    console.log('📝 Database schema is now up to date.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run migration
migrate();
