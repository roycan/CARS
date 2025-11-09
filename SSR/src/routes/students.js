/**
 * routes/students.js
 * Student information routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { checkValidation, sanitizeStudentData, isValidEmail } = require('../middleware/validation');
const { createStudent, findStudentByEmail } = require('../models/student');
const config = require('../config/env');

/**
 * GET /assessment/new - Student information form
 */
router.get('/new', (req, res) => {
  res.render('students/new', {
    title: 'Student Information',
    appName: req.app.locals.appName,
    counselor: req.session.counselor || null,
    sections: config.schoolConfig.sections,
    batches: config.schoolConfig.batches,
    schools: config.schoolConfig.schools,
    errors: req.session.errors || [],
    oldInput: req.session.oldInput || {}
  });
  
  // Clear session errors and old input
  delete req.session.errors;
  delete req.session.oldInput;
});

/**
 * POST /assessment/student - Submit student information
 */
router.post('/student',
  // Validation rules
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('section').notEmpty().withMessage('Section is required'),
    body('batch').notEmpty().withMessage('Batch is required')
  ],
  checkValidation,
  async (req, res) => {
    try {
      console.log('📝 Student form submitted:', req.body);
      
      // Sanitize input
      const studentData = sanitizeStudentData(req.body);
      console.log('✅ Sanitized data:', studentData);
      
      // Check if student already exists
      let student = findStudentByEmail(studentData.email);
      
      if (!student) {
        // Create new student
        student = createStudent(studentData);
        console.log('➕ Created new student:', student.id);
      } else {
        console.log('🔄 Found existing student:', student.id);
      }
      
      // Store student in session
      req.session.student = student;
      console.log('💾 Stored student in session:', req.session.student);
      
      // Save session before redirect to ensure it persists
      req.session.save((err) => {
        if (err) {
          console.error('❌ Session save error:', err);
          req.session.errors = [{ msg: 'An error occurred. Please try again.' }];
          req.session.oldInput = req.body;
          return res.redirect('/assessment/new');
        }
        
        console.log('✅ Session saved, redirecting to /assessment/form');
        // Redirect to assessment form
        res.redirect('/assessment/form');
      });
      
    } catch (error) {
      console.error('Error creating student:', error);
      req.session.errors = [{ msg: 'An error occurred. Please try again.' }];
      req.session.oldInput = req.body;
      res.redirect('/assessment/new');
    }
  }
);

module.exports = router;
