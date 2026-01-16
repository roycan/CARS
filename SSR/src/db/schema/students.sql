CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    section VARCHAR(100) NOT NULL,
    batch VARCHAR(10) NOT NULL,
    school VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_students_section ON students(section);
CREATE INDEX idx_students_batch ON students(batch);
CREATE INDEX idx_students_email ON students(email);