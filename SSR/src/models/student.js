const pool = require('../db/connection');

class Student {
  static async create(studentData) {
    const { name, email, section, batch, school } = studentData;
    
    const result = await pool.query(`
      INSERT INTO students (name, email, section, batch, school)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, email, section, batch, school]);
    
    return result.rows[0];
  }
  
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM students WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
  
  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM students WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }
  
  static async findAll(filters = {}) {
    let query = 'SELECT * FROM students';
    const params = [];
    const conditions = [];
    
    if (filters.section) {
      conditions.push(`section = $${params.length + 1}`);
      params.push(filters.section);
    }
    
    if (filters.batch) {
      conditions.push(`batch = $${params.length + 1}`);
      params.push(filters.batch);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    return result.rows;
  }
  
  static async getWithLatestAssessment() {
    const result = await pool.query(`
      SELECT 
        s.*,
        a.risk_level,
        a.self_harm_flagged,
        a.taken_at as last_assessment
      FROM students s
      LEFT JOIN LATERAL (
        SELECT risk_level, self_harm_flagged, taken_at
        FROM assessments 
        WHERE student_id = s.id 
        ORDER BY taken_at DESC 
        LIMIT 1
      ) a ON true
      ORDER BY s.created_at DESC
    `);
    
    return result.rows;
  }
}

module.exports = Student;