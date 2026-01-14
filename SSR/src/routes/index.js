/**
 * routes/index.js
 * Main routes (home, about)
 */

const express = require('express');
const { withSession } = require('../middleware/session');
const router = express.Router();

/**
 * GET / - Home page
 */
router.get('/', withSession(), (req, res) => {
  res.render('pages/home', {
    title: 'Home',
    counselor: req.session.counselorId || null
  });
});

/**
 * GET /about - About page
 */
router.get('/about', withSession(), (req, res) => {
  res.render('pages/about', {
    title: 'About',
    counselor: req.session.counselorId || null
  });
});

module.exports = router;
