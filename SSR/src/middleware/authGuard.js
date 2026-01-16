const { withSession } = require('./session');

function requireAuth(req, res, next) {
  if (!req.session.counselorId) {
    return res.redirect('/counselor/login');
  }
  next();
}

function requireGuest(req, res, next) {
  if (req.session.counselorId) {
    return res.redirect('/counselor/dashboard');
  }
  next();
}

// Combine session middleware with auth check
function withAuth(req, res, next) {
  withSession()(req, res, () => {
    requireAuth(req, res, next);
  });
}

function withGuest(req, res, next) {
  withSession()(req, res, () => {
    requireGuest(req, res, next);
  });
}

module.exports = {
  requireAuth,
  requireGuest,
  withAuth,
  withGuest
};