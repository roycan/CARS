CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    raw_answers JSONB NOT NULL,
    raw_scores JSONB NOT NULL,
    t_scores JSONB NOT NULL,
    risk_level VARCHAR(20) NOT NULL CHECK (risk_level IN ('normal', 'at-risk', 'high')),
    interpretation TEXT,
    self_harm_flagged BOOLEAN DEFAULT FALSE,
    taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assessments_student_id ON assessments(student_id);
CREATE INDEX idx_assessments_risk_level ON assessments(risk_level);
CREATE INDEX idx_assessments_taken_at ON assessments(taken_at);
CREATE INDEX idx_assessments_self_harm ON assessments(self_harm_flagged);