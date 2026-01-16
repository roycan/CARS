const express = require('express');
const { body, validationResult } = require('express-validator');
const { withSession } = require('../middleware/session');
const Student = require('../models/student');
const config = require('../config/env');
const router = express.Router();

/**
 * GET /assessment/new - Student information form
 */
router.get('/new', withSession(), (req, res) => {
  res.render('students/new', {
    title: 'Student Information',
    sections: config.SCHOOL_SECTIONS,
    batches: config.SCHOOL_BATCHES,
    schools: config.SCHOOL_NAMES,
    formData: req.session.formData || {}
  });
});

/**
 * POST /assessment/student - Process student information
 */
router.post('/student', 
  withSession(),
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('section').notEmpty().withMessage('Please select a section'),
    body('batch').notEmpty().withMessage('Please select a batch'),
    body('school').optional()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        req.session.errors = errors.array();
        req.session.formData = req.body;
        await req.session.save();
        return res.redirect('/assessment/new');
      }
      
      const { name, email, section, batch, school } = req.body;
      
      // Check if student already exists
      let student = await Student.findByEmail(email);
      
      if (!student) {
        // Create new student
        student = await Student.create({
          name,
          email,
          section,
          batch,
          school: school || null
        });
      }
      
      // Store student in session
      req.session.studentId = student.id;
      req.session.student = student;
      await req.session.save();
      
      res.redirect('/assessment/form');
      
    } catch (error) {
      console.error('Error processing student:', error);
      req.session.errors = [{ msg: 'An error occurred. Please try again.' }];
      req.session.formData = req.body;
      await req.session.save();
      res.redirect('/assessment/new');
    }
  }
);

module.exports = router;