/**
 * models/assessment.js
 * Assessment data access layer
 * Handles all database operations for assessments
 */

const { getDatabase } = require('../db/connection');

/**
 * Create a new assessment
 * @param {number} studentId - Student ID
 * @param {Object} assessmentData - Result from scoring.calculateAssessmentResult()
 * @returns {Object} Created assessment with id
 */
function createAssessment(studentId, assessmentData) {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO assessments (
      student_id, raw_answers, raw_scores, t_scores,
      risk_level, interpretation, self_harm_flagged
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const info = stmt.run(
    studentId,
    JSON.stringify(assessmentData.answers),
    JSON.stringify(assessmentData.rawScores),
    JSON.stringify(assessmentData.tScores),
    assessmentData.riskLevel,
    assessmentData.interpretation,
    assessmentData.selfHarmFlagged ? 1 : 0
  );
  
  return {
    id: info.lastInsertRowid,
    student_id: studentId,
    ...assessmentData
  };
}

/**
 * Find assessment by ID
 * @param {number} id - Assessment ID
 * @returns {Object|null} Assessment object or null
 */
function findAssessmentById(id) {
  const db = getDatabase();
  
  const stmt = db.prepare('SELECT * FROM assessments WHERE id = ?');
  const assessment = stmt.get(id);
  
  if (assessment) {
    // Parse JSON fields
    assessment.raw_answers = JSON.parse(assessment.raw_answers);
    assessment.raw_scores = JSON.parse(assessment.raw_scores);
    assessment.t_scores = JSON.parse(assessment.t_scores);
  }
  
  return assessment;
}

/**
 * Get all assessments for a student
 * @param {number} studentId - Student ID
 * @returns {Array} Array of assessment objects
 */
function getAssessmentsByStudentId(studentId) {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    SELECT * FROM assessments 
    WHERE student_id = ? 
    ORDER BY taken_at DESC
  `);
  
  const assessments = stmt.all(studentId);
  
  // Parse JSON fields for each assessment
  return assessments.map(a => ({
    ...a,
    raw_answers: JSON.parse(a.raw_answers),
    raw_scores: JSON.parse(a.raw_scores),
    t_scores: JSON.parse(a.t_scores)
  }));
}

/**
 * Get latest assessment for a student
 * @param {number} studentId - Student ID
 * @returns {Object|null} Latest assessment or null
 */
function getLatestAssessmentByStudentId(studentId) {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    SELECT * FROM assessments 
    WHERE student_id = ? 
    ORDER BY taken_at DESC 
    LIMIT 1
  `);
  
  const assessment = stmt.get(studentId);
  
  if (assessment) {
    assessment.raw_answers = JSON.parse(assessment.raw_answers);
    assessment.raw_scores = JSON.parse(assessment.raw_scores);
    assessment.t_scores = JSON.parse(assessment.t_scores);
  }
  
  return assessment;
}

/**
 * Get assessment statistics (for counselor dashboard)
 * @returns {Object} Statistics by risk level
 */
function getAssessmentStatistics() {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    SELECT 
      risk_level,
      COUNT(*) as count,
      COUNT(DISTINCT student_id) as unique_students
    FROM assessments
    GROUP BY risk_level
  `);
  
  const rows = stmt.all();
  
  // Convert array to object for easier access
  const stats = {
    total: 0,
    byRiskLevel: {}
  };
  
  rows.forEach(row => {
    stats.byRiskLevel[row.risk_level] = {
      count: row.count,
      uniqueStudents: row.unique_students
    };
    stats.total += row.count;
  });
  
  return stats;
}

/**
 * Get assessments with student info (for counselor dashboard)
 * @param {Object} filters - { riskLevel, section, batch, limit }
 * @returns {Array} Array of assessments with student data
 */
function getAssessmentsWithStudents(filters = {}) {
  const db = getDatabase();
  
  let query = `
    SELECT 
      a.*,
      s.name as student_name,
      s.email as student_email,
      s.section,
      s.batch,
      s.school
    FROM assessments a
    JOIN students s ON a.student_id = s.id
    WHERE 1=1
  `;
  const params = [];
  
  if (filters.riskLevel) {
    query += ' AND a.risk_level = ?';
    params.push(filters.riskLevel);
  }
  
  if (filters.section) {
    query += ' AND s.section = ?';
    params.push(filters.section);
  }
  
  if (filters.batch) {
    query += ' AND s.batch = ?';
    params.push(filters.batch);
  }
  
  query += ' ORDER BY a.taken_at DESC';
  
  if (filters.limit) {
    query += ' LIMIT ?';
    params.push(filters.limit);
  }
  
  const stmt = db.prepare(query);
  const assessments = stmt.all(...params);
  
  // Parse JSON fields
  return assessments.map(a => ({
    ...a,
    raw_answers: JSON.parse(a.raw_answers),
    raw_scores: JSON.parse(a.raw_scores),
    t_scores: JSON.parse(a.t_scores)
  }));
}

/**
 * Count self-harm flags
 * @returns {number} Count of assessments with self-harm flagged
 */
function countSelfHarmFlags() {
  const db = getDatabase();
  
  const stmt = db.prepare(`
    SELECT COUNT(*) as count 
    FROM assessments 
    WHERE self_harm_flagged = 1
  `);
  
  const result = stmt.get();
  return result.count;
}

module.exports = {
  createAssessment,
  findAssessmentById,
  getAssessmentsByStudentId,
  getLatestAssessmentByStudentId,
  getAssessmentStatistics,
  getAssessmentsWithStudents,
  countSelfHarmFlags
};
