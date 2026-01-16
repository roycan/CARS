const bcrypt = require('bcrypt');
const pool = require('../db/connection');
const config = require('../config/env');

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database seeding...');
    
    // Create default counselor
    const hashedPassword = await bcrypt.hash(config.DEFAULT_COUNSELOR_PASSWORD, 10);
    
    await client.query(`
      INSERT INTO counselors (username, password_hash) 
      VALUES ($1, $2) 
      ON CONFLICT (username) DO NOTHING
    `, [config.DEFAULT_COUNSELOR_USERNAME, hashedPassword]);
    
    console.log('✓ Default counselor created');
    
    // Create sample students
    const sampleStudents = [
      ['Maria Santos', 'maria.santos@email.com', 'Grade 9-A', '2025', 'Sample High School'],
      ['Juan Dela Cruz', 'juan.delacruz@email.com', 'Grade 9-B', '2025', 'Sample High School'],
      ['Ana Rodriguez', 'ana.rodriguez@email.com', 'Grade 9-A', '2026', 'Another High School'],
      ['Carlos Mendoza', 'carlos.mendoza@email.com', 'Grade 10-A', '2024', 'Sample High School'],
      ['Sofia Reyes', 'sofia.reyes@email.com', 'Grade 9-C', '2025', null]
    ];
    
    for (const student of sampleStudents) {
      await client.query(`
        INSERT INTO students (name, email, section, batch, school) 
        VALUES ($1, $2, $3, $4, $5) 
        ON CONFLICT (email) DO NOTHING
      `, student);
    }
    
    console.log('✓ Sample students created');
    
    // Create sample assessments with different risk levels
    const sampleAssessments = [
      {
        student_email: 'maria.santos@email.com',
        raw_answers: Array(24).fill(1).concat([0]), // Low risk
        risk_level: 'normal',
        self_harm_flagged: false
      },
      {
        student_email: 'juan.delacruz@email.com', 
        raw_answers: Array(24).fill(2).concat([0]), // Medium risk
        risk_level: 'at-risk',
        self_harm_flagged: false
      },
      {
        student_email: 'ana.rodriguez@email.com',
        raw_answers: Array(24).fill(3).concat([1]), // High risk with self-harm
        risk_level: 'high',
        self_harm_flagged: true
      }
    ];
    
    for (const assessment of sampleAssessments) {
      // Get student ID
      const studentResult = await client.query(
        'SELECT id FROM students WHERE email = $1',
        [assessment.student_email]
      );
      
      if (studentResult.rows.length > 0) {
        const studentId = studentResult.rows[0].id;
        
        // Calculate basic scores (simplified for seeding)
        const rawScores = {
          externalizing: assessment.raw_answers.slice(0, 6).reduce((a, b) => a + b, 0),
          internalizing: assessment.raw_answers.slice(6, 12).reduce((a, b) => a + b, 0),
          social: assessment.raw_answers.slice(12, 18).reduce((a, b) => a + b, 0),
          academic: assessment.raw_answers.slice(18, 24).reduce((a, b) => a + b, 0),
          total: assessment.raw_answers.slice(0, 24).reduce((a, b) => a + b, 0)
        };
        
        const tScores = {
          externalizing: Math.min(100, 50 + rawScores.externalizing * 2),
          internalizing: Math.min(100, 50 + rawScores.internalizing * 2),
          social: Math.min(100, 50 + rawScores.social * 2),
          academic: Math.min(100, 50 + rawScores.academic * 2),
          total: Math.min(100, 50 + rawScores.total * 0.5)
        };
        
        await client.query(`
          INSERT INTO assessments (
            student_id, raw_answers, raw_scores, t_scores, 
            risk_level, self_harm_flagged, interpretation
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT DO NOTHING
        `, [
          studentId,
          JSON.stringify(assessment.raw_answers),
          JSON.stringify(rawScores),
          JSON.stringify(tScores),
          assessment.risk_level,
          assessment.self_harm_flagged,
          `Sample assessment result: ${assessment.risk_level} risk level`
        ]);
      }
    }
    
    console.log('✓ Sample assessments created');
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();