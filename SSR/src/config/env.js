/**
 * config/env.js
 * Environment configuration management
 * Loads variables from .env file and provides defaults
 */

require('dotenv').config();

module.exports = {
  // Server settings
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  
  // Session configuration
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  
  // Database
  databasePath: process.env.DATABASE_PATH || './data/database.db',
  
  // Application
  appName: process.env.APP_NAME || 'CARS Assessment System',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  
  // Default counselor (for seeding)
  defaultCounselor: {
    username: process.env.DEFAULT_COUNSELOR_USERNAME || 'counselor',
    password: process.env.DEFAULT_COUNSELOR_PASSWORD || 'changeme123'
  },
  
  // School configuration (for dropdowns)
  schoolConfig: {
    sections: (process.env.SCHOOL_SECTIONS || 'Grade 9-A,Grade 9-B,Grade 9-C,Grade 9-D').split(',').map(s => s.trim()),
    batches: (process.env.SCHOOL_BATCHES || '2024,2025,2026,2027,2028').split(',').map(s => s.trim()),
    schools: (process.env.SCHOOL_NAMES || 'Sample High School,Another High School').split(',').map(s => s.trim())
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100
  },
  
  // Helper methods
  isDevelopment() {
    return this.nodeEnv === 'development';
  },
  
  isProduction() {
    return this.nodeEnv === 'production';
  }
};
