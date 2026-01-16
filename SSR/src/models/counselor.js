const pool = require('../db/connection');
const bcrypt = require('bcrypt');

class Counselor {
  static async findByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM counselors WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }
  
  static async validatePassword(username, password) {
    const counselor = await this.findByUsername(username);
    if (!counselor) {
      return null;
    }
    
    const isValid = await bcrypt.compare(password, counselor.password_hash);
    return isValid ? counselor : null;
  }
  
  static async logAccess(counselorId, action, studentId = null) {
    await pool.query(`
      INSERT INTO counselor_access_log (counselor_id, student_id, action)
      VALUES ($1, $2, $3)
    `, [counselorId, studentId, action]);
  }
  
  static async getAccessLog(counselorId, limit = 50) {
    const result = await pool.query(`
      SELECT 
        cal.*,
        s.name as student_name
      FROM counselor_access_log cal
      LEFT JOIN students s ON cal.student_id = s.id
      WHERE cal.counselor_id = $1
      ORDER BY cal.accessed_at DESC
      LIMIT $2
    `, [counselorId, limit]);
    
    return result.rows;
  }
}

module.exports = Counselor;