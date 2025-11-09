/**
 * models/student.js
 * Student data access layer
 * Handles all database operations for students
 */

const { getDatabase } = require('../db/connection');

/**
 * Create a new student
 * @param {Object} studentData - { name, email, section, batch, school }
 * @returns {Object} Created student with id
 */
function createStudent(studentData) {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO students (name, email, section, batch, school)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const info = stmt.run(
    studentData.name,
    studentData.email,
    studentData.section,
    studentData.batch,
    studentData.school || null
  );
  
  return {
    id: info.lastInsertRowid,
    ...studentData
  };
}

/**
 * Find student by ID
 * @param {number} id - Student ID
 * @returns {Object|null} Student object or null
 */
function findStudentById(id) {
  const db = getDatabase();
  
  const stmt = db.prepare('SELECT * FROM students WHERE id = ?');
  return stmt.get(id);
}

/**
 * Find student by email
 * @param {string} email - Student email
 * @returns {Object|null} Student object or null
 */
function findStudentByEmail(email) {
  const db = getDatabase();
  
  const stmt = db.prepare('SELECT * FROM students WHERE email = ?');
  return stmt.get(email);
}

/**
 * Get all students with optional filtering
 * @param {Object} filters - { section, batch, school }
 * @returns {Array} Array of student objects
 */
function getAllStudents(filters = {}) {
  const db = getDatabase();
  
  let query = 'SELECT * FROM students WHERE 1=1';
  const params = [];
  
  if (filters.section) {
    query += ' AND section = ?';
    params.push(filters.section);
  }
  
  if (filters.batch) {
    query += ' AND batch = ?';
    params.push(filters.batch);
  }
  
  if (filters.school) {
    query += ' AND school = ?';
    params.push(filters.school);
  }
  
  query += ' ORDER BY created_at DESC';
  
  const stmt = db.prepare(query);
  return stmt.all(...params);
}

/**
 * Get students with their latest assessment
 * @param {Object} filters - { section, batch, school, riskLevel }
 * @returns {Array} Array of students with assessment data
 */
function getStudentsWithAssessments(filters = {}) {
  const db = getDatabase();
  
  let query = `
    SELECT 
      s.*,
      a.id as assessment_id,
      a.t_scores,
      a.risk_level,
      a.self_harm_flagged,
      a.taken_at
    FROM students s
    LEFT JOIN assessments a ON s.id = a.student_id
    WHERE 1=1
  `;
  const params = [];
  
  if (filters.section) {
    query += ' AND s.section = ?';
    params.push(filters.section);
  }
  
  if (filters.batch) {
    query += ' AND s.batch = ?';
    params.push(filters.batch);
  }
  
  if (filters.school) {
    query += ' AND s.school = ?';
    params.push(filters.school);
  }
  
  if (filters.riskLevel) {
    query += ' AND a.risk_level = ?';
    params.push(filters.riskLevel);
  }
  
  query += ' ORDER BY a.taken_at DESC, s.created_at DESC';
  
  const stmt = db.prepare(query);
  return stmt.all(...params);
}

/**
 * Count students by filters
 * @param {Object} filters - { section, batch, school }
 * @returns {number} Count of students
 */
function countStudents(filters = {}) {
  const db = getDatabase();
  
  let query = 'SELECT COUNT(*) as count FROM students WHERE 1=1';
  const params = [];
  
  if (filters.section) {
    query += ' AND section = ?';
    params.push(filters.section);
  }
  
  if (filters.batch) {
    query += ' AND batch = ?';
    params.push(filters.batch);
  }
  
  if (filters.school) {
    query += ' AND school = ?';
    params.push(filters.school);
  }
  
  const stmt = db.prepare(query);
  const result = stmt.get(...params);
  return result.count;
}

module.exports = {
  createStudent,
  findStudentById,
  findStudentByEmail,
  getAllStudents,
  getStudentsWithAssessments,
  countStudents
};
