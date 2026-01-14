const express = require('express');
const { withSession } = require('../middleware/session');
const Student = require('../models/student');
const Assessment = require('../models/assessment');
const { QUESTIONS, RATING_OPTIONS, calculateAssessmentResult } = require('../services/scoring');
const router = express.Router();

/**
 * GET /assessment/form - Assessment questionnaire
 */
router.get('/form', withSession(), (req, res) => {
  if (!req.session.studentId) {
    return res.redirect('/assessment/new');
  }
  
  res.render('assessments/form', {
    title: 'CARS Assessment',
    questions: QUESTIONS,
    ratingOptions: RATING_OPTIONS
  });
});

/**
 * POST /assessment/submit - Process assessment submission
 */
router.post('/submit', withSession(), async (req, res) => {
  try {
    if (!req.session.studentId) {
      return res.redirect('/assessment/new');
    }
    
    // Collect answers from form
    const answers = [];
    for (let i = 0; i < QUESTIONS.length; i++) {
      const answer = parseInt(req.body[`q${i}`]) || 0;
      answers.push(answer);
    }
    
    // Calculate assessment result
    const result = calculateAssessmentResult(answers);
    
    // Save assessment to database
    const assessment = await Assessment.create({
      student_id: req.session.studentId,
      ...result
    });
    
    // Get student info for display
    const student = await Student.findById(req.session.studentId);
    
    // Store result in session for display
    req.session.assessmentResult = {
      ...result,
      assessmentId: assessment.id
    };
    await req.session.save();
    
    res.render('assessments/result', {
      title: 'Assessment Results',
      student,
      result
    });
    
  } catch (error) {
    console.error('Error processing assessment:', error);
    req.session.errors = [{ msg: 'An error occurred while processing your assessment. Please try again.' }];
    await req.session.save();
    res.redirect('/assessment/form');
  }
});

/**
 * GET /assessment/result - View assessment result (if in session)
 */
router.get('/result', withSession(), async (req, res) => {
  try {
    if (!req.session.assessmentResult || !req.session.studentId) {
      return res.redirect('/assessment/new');
    }
    
    const student = await Student.findById(req.session.studentId);
    const result = req.session.assessmentResult;
    
    res.render('assessments/result', {
      title: 'Assessment Results',
      student,
      result
    });
    
  } catch (error) {
    console.error('Error displaying result:', error);
    res.redirect('/assessment/new');
  }
});

module.exports = router;