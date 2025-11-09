-- schema.sql
-- Database schema for CARS Assessment System
-- SQLite database structure

-- Students table: stores basic student information
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  section TEXT NOT NULL,
  batch TEXT NOT NULL,
  school TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups by section and batch
CREATE INDEX IF NOT EXISTS idx_students_section ON students(section);
CREATE INDEX IF NOT EXISTS idx_students_batch ON students(batch);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);

-- Assessments table: stores individual assessment results
CREATE TABLE IF NOT EXISTS assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  raw_answers TEXT NOT NULL,           -- JSON array of answers [0-4]
  raw_scores TEXT NOT NULL,            -- JSON object of raw scores by scale
  t_scores TEXT NOT NULL,              -- JSON object of T-scores by scale
  risk_level TEXT NOT NULL,            -- "Normal/No Risk", "At-risk", "High risk"
  interpretation TEXT NOT NULL,        -- Full interpretation text
  self_harm_flagged INTEGER DEFAULT 0, -- 1 if question 25 was marked
  taken_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Index for faster lookups by student and date
CREATE INDEX IF NOT EXISTS idx_assessments_student ON assessments(student_id);
CREATE INDEX IF NOT EXISTS idx_assessments_date ON assessments(taken_at);
CREATE INDEX IF NOT EXISTS idx_assessments_risk ON assessments(risk_level);

-- Counselors table: stores counselor login credentials
CREATE TABLE IF NOT EXISTS counselors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Access logs: tracks when counselors view student data
CREATE TABLE IF NOT EXISTS counselor_access_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  counselor_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  action TEXT NOT NULL,                -- 'viewed_list', 'viewed_detail', 'exported'
  accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (counselor_id) REFERENCES counselors(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Index for access log queries
CREATE INDEX IF NOT EXISTS idx_access_log_counselor ON counselor_access_log(counselor_id);
CREATE INDEX IF NOT EXISTS idx_access_log_date ON counselor_access_log(accessed_at);

-- Trigger to update student updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_student_timestamp 
AFTER UPDATE ON students
BEGIN
  UPDATE students SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
