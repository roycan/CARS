/**
 * services/auth.js
 * Authentication helper functions
 * Handles password hashing and verification
 */

const bcrypt = require('bcrypt');

// Number of salt rounds for bcrypt (higher = more secure but slower)
// 10 is a good balance for teaching (fast enough, still secure)
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password
 * @param {string} plainPassword - Plain text password
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Verify a plain text password against a hash
 * @param {string} plainPassword - Plain text password to check
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} True if password matches
 */
async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  verifyPassword
};
