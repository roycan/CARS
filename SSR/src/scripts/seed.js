/**
 * scripts/seed.js
 * Database seeding script
 * Creates default counselor account for testing
 * 
 * Usage: npm run seed
 */

const { initDatabase } = require('../db/connection');
const { createCounselor, counselorExists } = require('../models/counselor');
const config = require('../config/env');

async function seed() {
  console.log('🌱 Starting database seeding...\n');
  
  try {
    // Initialize database
    initDatabase();
    
    // Check if counselor already exists
    if (counselorExists()) {
      console.log('⚠️  Counselor account already exists. Skipping seed.');
      console.log('💡 To create a new counselor, use the application or delete the database.\n');
      process.exit(0);
    }
    
    // Create default counselor
    const counselor = await createCounselor(
      config.defaultCounselor.username,
      config.defaultCounselor.password
    );
    
    console.log('✅ Default counselor account created!');
    console.log(`   Username: ${counselor.username}`);
    console.log(`   Password: ${config.defaultCounselor.password}`);
    console.log('\n⚠️  IMPORTANT: Change this password after first login!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run seed
seed();
