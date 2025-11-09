/**
 * db/connection.js
 * Database connection and setup
 * Uses better-sqlite3 (synchronous) for simplicity in teaching
 */

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const config = require('../config/env');

let db = null;

/**
 * Initialize database connection
 * Creates database file if it doesn't exist
 * Configures SQLite for better performance and concurrency
 */
function initDatabase() {
  if (db) return db;
  
  // Ensure data directory exists
  const dataDir = path.dirname(config.databasePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Create database connection
  db = new Database(config.databasePath, {
    verbose: config.isDevelopment() ? console.log : null
  });
  
  // Enable Write-Ahead Logging (WAL) mode for better concurrency
  // This allows multiple readers while a write is happening
  db.pragma('journal_mode = WAL');
  
  // Enable foreign key constraints
  db.pragma('foreign_keys = ON');
  
  console.log(`📊 Database connected: ${config.databasePath}`);
  
  return db;
}

/**
 * Get the database instance
 * Initializes if not already connected
 */
function getDatabase() {
  if (!db) {
    initDatabase();
  }
  return db;
}

/**
 * Close database connection
 * Should be called when server shuts down
 */
function closeDatabase() {
  if (db) {
    db.close();
    db = null;
    console.log('📊 Database connection closed');
  }
}

/**
 * Run migration from SQL file
 * Used to set up initial schema
 */
function runMigration(sqlFilePath) {
  const database = getDatabase();
  const sql = fs.readFileSync(sqlFilePath, 'utf8');
  
  // Execute the SQL (schema creation)
  database.exec(sql);
  console.log(`✅ Migration applied: ${path.basename(sqlFilePath)}`);
}

module.exports = {
  initDatabase,
  getDatabase,
  closeDatabase,
  runMigration
};
