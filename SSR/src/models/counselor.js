/**
 * models/counselor.js
 * Counselor data access layer
 * Handles all database operations for counselors and access logs
 */

const { getDatabase } = require('../db/connection');
const { hashPassword } = require('../services/auth');

/**
 * Create a new counselor
 * @param {string} username - Username
 * @param {string} plainPassword - Plain text password (will be hashed)
 * @returns {Promise<Object>} Created counselor (without password)
 */
async function createCounselor(username, plainPassword) {
  const db = getDatabase();
  
  // Hash the password
  const passwordHash = await hashPassword(plainPassword);
  
  const stmt = db.prepare(`
    INSERT INTO counselors (username, password_hash)
    VALUES (?, ?)
  `);
  
  const info = stmt.run(username, passwordHash);
  
  return {
    id: info.lastInsertRowid,
    username
  };
}

/**
 * Find counselor by username
 * @param {string} username - Username
 * @returns {Object|null} Counselor object with password_hash
 */
function findCounselorByUsername(username) {
  const db = getDatabase();
  
  const stmt = db.prepare('SELECT * FROM counselors WHERE username = ?');
  return stmt.get(username);
}

/**
 * Find counselor by ID
 * @param {number} id - Counselor ID
 * @returns {Object|null} Counselor object
 */
function findCounselorById(id) {
  const db = getDatabase();
  
  const stmt = db.prepare('SELECT id, username, created_at FROM counselors WHERE id = ?');
  return stmt.get(id);
}

/**
 * Log counselor access to student data
 * @param {number} counselorId - Counselor ID
 * @param {number} studentId - Student ID
 * @param {string} action - Action performed (e.g., 'viewed_list', 'viewed_detail')
 */
function logAccess(counselorId, studentId, action) {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO counselor_access_log (counselor_id, student_id, action)
    VALUES (?, ?, ?)
  `);
  
  stmt.run(counselorId, studentId, action);
}

/**
 * Get recent access logs for a counselor
 * @param {number} counselorId - Counselor ID
 * @param {number} limit - Number of logs to return
 * @returns {Array} Array of access log entries with student names
 */
function getRecentAccessLogs(counselorId, limit = 50) {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    SELECT 
      l.*,
      s.name as student_name
    FROM counselor_access_log l
    JOIN students s ON l.student_id = s.id
    WHERE l.counselor_id = ?
    ORDER BY l.accessed_at DESC
    LIMIT ?
  `);
  
  return stmt.all(counselorId, limit);
}

/**
 * Check if counselor exists
 * @returns {boolean} True if at least one counselor exists
 */
function counselorExists() {
  const db = getDatabase();
  
  const stmt = db.prepare('SELECT COUNT(*) as count FROM counselors');
  const result = stmt.get();
  return result.count > 0;
}

module.exports = {
  createCounselor,
  findCounselorByUsername,
  findCounselorById,
  logAccess,
  getRecentAccessLogs,
  counselorExists
};
