/**
 * server.js
 * Main Express application server
 * Entry point for the CARS SSR Assessment System
 */

const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const expressLayouts = require('express-ejs-layouts');

// Session middleware
const { withSession } = require('./middleware/session');

// Database connection
const pool = require('./db/connection');
const config = require('./config/env');

// Routes
const indexRoutes = require('./routes/index');
const studentRoutes = require('./routes/students');
const assessmentRoutes = require('./routes/assessments');
const counselorRoutes = require('./routes/counselor');

// Initialize Express app
const app = express();

// Trust proxy (needed for Railway and other platforms)
app.set('trust proxy', 1);

// View engine setup (EJS with layouts)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/base');

// Global app locals (available in all templates)
app.locals.appName = config.APP_NAME;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
    }
  }
}));

// Compression middleware (gzip responses)
app.use(compression());

// (moved) Diagnostic request logger registered after session middleware

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware (iron-session)
app.use(withSession());

// Diagnostic request logger (temporary for local testing) - after session so it can read it
app.use((req, res, next) => {
  const hasStudent = !!(req.session && req.session.student);
  const hasCounselor = !!(req.session && req.session.counselor);
  console.log(
    `➡️  ${new Date().toISOString()} ${req.method} ${req.originalUrl} | student:${hasStudent ? 'Y' : 'N'} counselor:${hasCounselor ? 'Y' : 'N'} sessionID:${req.sessionID}`
  );
  next();
});

// Rate limiting (prevent abuse)
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/counselor/login', limiter); // Apply to login route
app.use('/assessment/submit', limiter); // Apply to assessment submission

// Static files (if we add any later)
app.use(express.static(path.join(__dirname, '../public')));

// Flash messages middleware (make errors/success available to views)
app.use((req, res, next) => {
  res.locals.errors = req.session.errors || [];
  res.locals.success = req.session.success || null;
  res.locals.info = req.session.info || null;
  res.locals.warning = req.session.warning || null;
  
  // Clear flash messages after displaying
  delete req.session.errors;
  delete req.session.success;
  delete req.session.info;
  delete req.session.warning;
  
  next();
});

// Routes
app.use('/', indexRoutes);
app.use('/assessment', studentRoutes);
app.use('/assessment', assessmentRoutes);
app.use('/counselor', counselorRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).render('pages/error', {
    title: '404 - Page Not Found',
    appName: config.APP_NAME,
    counselor: req.session.counselorId || null,
    errors: [{ msg: `Page not found: ${req.url}` }]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  res.status(err.status || 500).render('pages/error', {
    title: 'Error',
    appName: config.APP_NAME,
    counselor: req.session.counselorId || null,
    errors: [{ 
      msg: config.NODE_ENV === 'development' 
        ? err.message 
        : 'An unexpected error occurred. Please try again later.' 
    }]
  });
});

// Start server
const PORT = config.PORT;
const server = app.listen(PORT, () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║   🎓 CARS Assessment System - SSR Edition    ║');
  console.log('╚═══════════════════════════════════════════════╝');
  console.log('');
  console.log(`✅ Server running in ${config.NODE_ENV} mode`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📡 Port: ${PORT}`);
  console.log('');
  console.log('📚 Available routes:');
  console.log('   - Home: http://localhost:' + PORT);
  console.log('   - About: http://localhost:' + PORT + '/about');
  console.log('   - Assessment: http://localhost:' + PORT + '/assessment/new');
  console.log('   - Counselor Login: http://localhost:' + PORT + '/counselor/login');
  console.log('');
  console.log('💡 First time setup:');
  console.log('   1. Run: npm run migrate (set up database)');
  console.log('   2. Run: npm run seed (create counselor account)');
  console.log('   3. Login with username: counselor, password: changeme123');
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('💤 HTTP server closed');
    pool.end();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('💤 HTTP server closed');
    pool.end();
    process.exit(0);
  });
});

module.exports = app;
