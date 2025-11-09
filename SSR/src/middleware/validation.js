/**
 * middleware/validation.js
 * Input validation helpers
 * Validates form data to prevent invalid submissions
 */

const { validationResult } = require('express-validator');

/**
 * Middleware to check validation results
 * If validation fails, redirects back with error messages
 */
function checkValidation(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Store errors in session for display
    req.session.errors = errors.array();
    req.session.oldInput = req.body; // Save user input to repopulate form
    
    // Redirect back to form
    return res.redirect('back');
  }
  
  // Validation passed, proceed
  next();
}

/**
 * Sanitize student input
 * Trims whitespace and normalizes data
 */
function sanitizeStudentData(data) {
  return {
    name: data.name ? data.name.trim() : '',
    email: data.email ? data.email.trim().toLowerCase() : '',
    section: data.section ? data.section.trim() : '',
    batch: data.batch ? data.batch.trim() : '',
    school: data.school ? data.school.trim() : null
  };
}

/**
 * Validate email format (simple regex)
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  checkValidation,
  sanitizeStudentData,
  isValidEmail
};
