CREATE TABLE IF NOT EXISTS counselor_access_log (
    id SERIAL PRIMARY KEY,
    counselor_id INTEGER NOT NULL REFERENCES counselors(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_access_log_counselor_id ON counselor_access_log(counselor_id);
CREATE INDEX idx_access_log_student_id ON counselor_access_log(student_id);
CREATE INDEX idx_access_log_accessed_at ON counselor_access_log(accessed_at);