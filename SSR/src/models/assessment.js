const pool = require('../db/connection');

class Assessment {
  static async create(assessmentData) {
    const {
      student_id,
      raw_answers,
      raw_scores,
      t_scores,
      risk_level,
      interpretation,
      self_harm_flagged
    } = assessmentData;
    
    const result = await pool.query(`
      INSERT INTO assessments (
        student_id, raw_answers, raw_scores, t_scores,
        risk_level, interpretation, self_harm_flagged
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [
      student_id,
      JSON.stringify(raw_answers),
      JSON.stringify(raw_scores),
      JSON.stringify(t_scores),
      risk_level,
      interpretation,
      self_harm_flagged
    ]);
    
    return result.rows[0];
  }
  
  static async findById(id) {
    const result = await pool.query(`
      SELECT 
        a.*,
        s.name as student_name,
        s.email as student_email,
        s.section,
        s.batch
      FROM assessments a
      JOIN students s ON a.student_id = s.id
      WHERE a.id = $1
    `, [id]);
    
    return result.rows[0];
  }
  
  static async findByStudentId(studentId) {
    const result = await pool.query(`
      SELECT * FROM assessments 
      WHERE student_id = $1 
      ORDER BY taken_at DESC
    `, [studentId]);
    
    return result.rows;
  }
  
  static async getStatistics() {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_assessments,
        COUNT(CASE WHEN risk_level = 'normal' THEN 1 END) as normal_count,
        COUNT(CASE WHEN risk_level = 'at-risk' THEN 1 END) as at_risk_count,
        COUNT(CASE WHEN risk_level = 'high' THEN 1 END) as high_risk_count,
        COUNT(CASE WHEN self_harm_flagged = true THEN 1 END) as self_harm_count,
        COUNT(DISTINCT student_id) as unique_students
      FROM assessments
    `);
    
    return result.rows[0];
  }
  
  static async getRecentAssessments(limit = 10) {
    const result = await pool.query(`
      SELECT 
        a.*,
        s.name as student_name,
        s.section,
        s.batch
      FROM assessments a
      JOIN students s ON a.student_id = s.id
      ORDER BY a.taken_at DESC
      LIMIT $1
    `, [limit]);
    
    return result.rows;
  }
  
  static async getHighRiskAssessments() {
    const result = await pool.query(`
      SELECT 
        a.*,
        s.name as student_name,
        s.email as student_email,
        s.section,
        s.batch
      FROM assessments a
      JOIN students s ON a.student_id = s.id
      WHERE a.risk_level = 'high' OR a.self_harm_flagged = true
      ORDER BY a.taken_at DESC
    `);
    
    return result.rows;
  }
}

module.exports = Assessment;