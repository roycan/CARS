/**
 * middleware/authGuard.js
 * Authentication middleware to protect counselor routes
 * Checks if user is logged in before allowing access
 */

/**
 * Middleware to require authentication
 * Redirects to login page if not authenticated
 */
function requireAuth(req, res, next) {
  // Check if user is logged in (session has counselor data)
  if (req.session && req.session.counselor) {
    // User is authenticated, proceed to route
    return next();
  }
  
  // User is not authenticated, redirect to login
  req.session.returnTo = req.originalUrl; // Save where they were trying to go
  res.redirect('/counselor/login');
}

/**
 * Middleware to redirect if already authenticated
 * Used on login page - if already logged in, go to dashboard
 */
function redirectIfAuthenticated(req, res, next) {
  if (req.session && req.session.counselor) {
    // Already logged in, redirect to dashboard
    return res.redirect('/counselor/dashboard');
  }
  
  // Not logged in, proceed to login page
  next();
}

module.exports = {
  requireAuth,
  redirectIfAuthenticated
};
