const express = require('express');
const { body, validationResult } = require('express-validator');
const { withSession } = require('../middleware/session');
const { withAuth, withGuest } = require('../middleware/authGuard');
const Counselor = require('../models/counselor');
const Student = require('../models/student');
const Assessment = require('../models/assessment');
const config = require('../config/env');
const router = express.Router();

/**
 * GET /counselor/login - Login page
 */
router.get('/login', withGuest, (req, res) => {
  res.render('counselor/login', {
    title: 'Counselor Login',
    formData: req.session.formData || {}
  });
});

/**
 * POST /counselor/login - Process login
 */
router.post('/login',
  withSession(),
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        req.session.errors = errors.array();
        req.session.formData = req.body;
        await req.session.save();
        return res.redirect('/counselor/login');
      }
      
      const { username, password } = req.body;
      
      // Validate credentials
      const counselor = await Counselor.validatePassword(username, password);
      
      if (!counselor) {
        req.session.errors = [{ msg: 'Invalid username or password' }];
        req.session.formData = { username };
        await req.session.save();
        return res.redirect('/counselor/login');
      }
      
      // Set session
      req.session.counselorId = counselor.id;
      req.session.counselor = {
        id: counselor.id,
        username: counselor.username
      };
      await req.session.save();
      
      // Log access
      await Counselor.logAccess(counselor.id, 'login');
      
      res.redirect('/counselor/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      req.session.errors = [{ msg: 'An error occurred during login. Please try again.' }];
      await req.session.save();
      res.redirect('/counselor/login');
    }
  }
);

/**
 * POST /counselor/logout - Logout
 */
router.post('/logout', withAuth, async (req, res) => {
  try {
    if (req.session.counselorId) {
      await Counselor.logAccess(req.session.counselorId, 'logout');
    }
    
    req.session.destroy();
    res.redirect('/');
    
  } catch (error) {
    console.error('Logout error:', error);
    res.redirect('/');
  }
});

/**
 * GET /counselor/dashboard - Main dashboard
 */
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get statistics
    const stats = await Assessment.getStatistics();
    
    // Get students with latest assessment
    const students = await Student.getWithLatestAssessment();
    
    // Log access
    await Counselor.logAccess(req.session.counselorId, 'view_dashboard');
    
    res.render('counselor/dashboard', {
      title: 'Counselor Dashboard',
      stats,
      students,
      sections: config.SCHOOL_SECTIONS
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    req.session.errors = [{ msg: 'Error loading dashboard data' }];
    await req.session.save();
    res.redirect('/');
  }
});

/**
 * GET /counselor/student/:id - Individual student view
 */
router.get('/student/:id', withAuth, async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    
    // Get student info
    const student = await Student.findById(studentId);
    if (!student) {
      req.session.errors = [{ msg: 'Student not found' }];
      await req.session.save();
      return res.redirect('/counselor/dashboard');
    }
    
    // Get assessment history
    const assessments = await Assessment.findByStudentId(studentId);
    
    // Log access
    await Counselor.logAccess(req.session.counselorId, 'view_student', studentId);
    
    res.render('counselor/student', {
      title: `${student.name} - Student Details`,
      student,
      assessments
    });
    
  } catch (error) {
    console.error('Student view error:', error);
    req.session.errors = [{ msg: 'Error loading student data' }];
    await req.session.save();
    res.redirect('/counselor/dashboard');
  }
});

module.exports = router;