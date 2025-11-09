/**
 * routes/index.js
 * Main routes (home, about)
 */

const express = require('express');
const router = express.Router();

/**
 * GET / - Home page
 */
router.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'Home',
    appName: req.app.locals.appName,
    counselor: req.session.counselor || null
  });
});

/**
 * GET /about - About page
 */
router.get('/about', (req, res) => {
  res.render('pages/about', {
    title: 'About',
    appName: req.app.locals.appName,
    counselor: req.session.counselor || null
  });
});

module.exports = router;
