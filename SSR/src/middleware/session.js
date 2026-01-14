const { getIronSession } = require('iron-session');
const config = require('../config/env');

const sessionOptions = {
  password: config.SESSION_SECRET,
  cookieName: 'cars-session',
  cookieOptions: {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
};

function withSession(handler) {
  return async (req, res, next) => {
    req.session = await getIronSession(req, res, sessionOptions);
    
    if (handler) {
      return handler(req, res, next);
    }
    
    if (next) {
      next();
    }
  };
}

module.exports = { withSession, sessionOptions };