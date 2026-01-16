require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  APP_NAME: process.env.APP_NAME || 'CARS Assessment System',
  
  // Counselor defaults
  DEFAULT_COUNSELOR_USERNAME: process.env.DEFAULT_COUNSELOR_USERNAME || 'counselor',
  DEFAULT_COUNSELOR_PASSWORD: process.env.DEFAULT_COUNSELOR_PASSWORD || 'changeme123',
  
  // School configuration
  SCHOOL_SECTIONS: process.env.SCHOOL_SECTIONS ? process.env.SCHOOL_SECTIONS.split(',') : ['Grade 9-A', 'Grade 9-B'],
  SCHOOL_BATCHES: process.env.SCHOOL_BATCHES ? process.env.SCHOOL_BATCHES.split(',') : ['2024', '2025'],
  SCHOOL_NAMES: process.env.SCHOOL_NAMES ? process.env.SCHOOL_NAMES.split(',') : ['Sample High School'],
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
};