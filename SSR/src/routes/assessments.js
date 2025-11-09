/**
 * routes/assessments.js
 * Assessment routes (questionnaire, submission, results)
 */

const express = require('express');
const router = express.Router();
const { QUESTIONS, RATING_OPTIONS, SELF_HARM_OPTIONS, SCALES, calculateAssessmentResult } = require('../services/scoring');
const { createAssessment, findAssessmentById } = require('../models/assessment');

/**
 * Middleware to ensure student info exists in session
 */
function requireStudentSession(req, res, next) {
  console.log('🔍 Checking for student in session:', req.session.student ? 'FOUND' : 'NOT FOUND');
  console.log('📦 Session ID:', req.sessionID);
  console.log('👤 Student data:', req.session.student);
  
  if (!req.session.student) {
    console.log('❌ No student in session, redirecting to /assessment/new');
    return res.redirect('/assessment/new');
  }
  console.log('✅ Student session valid, continuing');
  next();
}

/**
 * GET /assessment/form - Assessment questionnaire
 */
router.get('/form', requireStudentSession, (req, res) => {
  res.render('assessments/form', {
    title: 'Assessment',
    appName: req.app.locals.appName,
    counselor: req.session.counselor || null,
    student: req.session.student,
    questions: QUESTIONS,
    ratingOptions: RATING_OPTIONS,
    selfHarmOptions: SELF_HARM_OPTIONS
  });
});

/**
 * POST /assessment/submit - Submit assessment answers
 */
router.post('/submit', requireStudentSession, (req, res) => {
  try {
    const studentId = req.session.student.id;
    
    // Collect answers (q0 through q24)
    const answers = [];
    for (let i = 0; i < 25; i++) {
      const answer = parseInt(req.body[`q${i}`], 10);
      answers.push(isNaN(answer) ? 0 : answer);
    }
    
    // Calculate assessment result
    const result = calculateAssessmentResult(answers);
    
    // Save to database
    const assessment = createAssessment(studentId, result);
    
    // Store assessment ID in session for result page
    req.session.assessmentId = assessment.id;
    
    // Redirect to results
    res.redirect('/assessment/result');
    
  } catch (error) {
    console.error('Error submitting assessment:', error);
    req.session.errors = [{ msg: 'An error occurred while processing your assessment. Please try again.' }];
    res.redirect('/assessment/form');
  }
});

/**
 * GET /assessment/result - View assessment results
 */
router.get('/result', requireStudentSession, (req, res) => {
  try {
    if (!req.session.assessmentId) {
      return res.redirect('/assessment/new');
    }
    
    const assessment = findAssessmentById(req.session.assessmentId);
    
    if (!assessment) {
      return res.redirect('/assessment/new');
    }
    
    res.render('assessments/result', {
      title: 'Assessment Results',
      appName: req.app.locals.appName,
      counselor: req.session.counselor || null,
      student: req.session.student,
      assessment,
      result: {
        answers: assessment.raw_answers,
        rawScores: assessment.raw_scores,
        tScores: assessment.t_scores,
        riskLevel: assessment.risk_level,
        interpretation: assessment.interpretation,
        selfHarmFlagged: assessment.self_harm_flagged === 1,
        calculatedAt: assessment.taken_at
      },
      scales: SCALES
    });
    
    // Clear session data after showing results
    delete req.session.student;
    delete req.session.assessmentId;
    
  } catch (error) {
    console.error('Error displaying results:', error);
    req.session.errors = [{ msg: 'An error occurred while displaying results.' }];
    res.redirect('/assessment/new');
  }
});

module.exports = router;
