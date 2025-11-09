/**
 * routes/counselor.js
 * Counselor routes (login, dashboard, student details)
 */

const express = require('express');
const router = express.Router();
const { requireAuth, redirectIfAuthenticated } = require('../middleware/authGuard');
const { findCounselorByUsername, logAccess } = require('../models/counselor');
const { getAssessmentsByStudentId, getAssessmentStatistics, countSelfHarmFlags } = require('../models/assessment');
const { findStudentById, countStudents, getStudentsWithAssessments } = require('../models/student');
const { verifyPassword } = require('../services/auth');
const config = require('../config/env');

/**
 * GET /counselor/login - Login page
 */
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('counselor/login', {
    title: 'Counselor Login',
    appName: req.app.locals.appName,
    counselor: null,
    errors: req.session.errors || []
  });
  delete req.session.errors;
});

/**
 * POST /counselor/login - Handle login
 */
router.post('/login', redirectIfAuthenticated, async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('🔐 Login attempt:', { username });
    
    // Find counselor
    const counselor = findCounselorByUsername(username);
    
    if (!counselor) {
      console.log('❌ Counselor not found');
      req.session.errors = [{ msg: 'Invalid username or password' }];
      return res.redirect('/counselor/login');
    }
    
    // Verify password
    const isValid = await verifyPassword(password, counselor.password_hash);
    
    if (!isValid) {
      console.log('❌ Invalid password');
      req.session.errors = [{ msg: 'Invalid username or password' }];
      return res.redirect('/counselor/login');
    }
    
    // Store counselor in session (without password hash)
    req.session.counselor = {
      id: counselor.id,
      username: counselor.username
    };
    console.log('✅ Counselor authenticated, saving session:', req.session.counselor);
    
    // Save session before redirect
    req.session.save(err => {
      if (err) {
        console.error('❌ Session save failed after login:', err);
        req.session.errors = [{ msg: 'Session error. Please try again.' }];
        return res.redirect('/counselor/login');
      }
      const returnTo = req.session.returnTo || '/counselor/dashboard';
      delete req.session.returnTo;
      console.log('➡️ Redirecting to', returnTo, 'sessionID:', req.sessionID);
      res.redirect(returnTo);
    });
    
  } catch (error) {
    console.error('Login error:', error);
    req.session.errors = [{ msg: 'An error occurred during login' }];
    res.redirect('/counselor/login');
  }
});

/**
 * GET /counselor/logout - Logout
 */
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

/**
 * GET /counselor/dashboard - Main dashboard
 */
router.get('/dashboard', requireAuth, (req, res) => {
  try {
    // Get filters from query string
    const filters = {
      section: req.query.section || '',
      batch: req.query.batch || '',
      riskLevel: req.query.riskLevel || ''
    };
    
    // Get students with assessments
    const students = getStudentsWithAssessments(filters);
    
    // Get statistics
    const assessmentStats = getAssessmentStatistics();
    const totalStudents = countStudents();
    const selfHarmCount = countSelfHarmFlags();
    
    // Calculate counts by risk level
    const stats = {
      totalStudents,
      normalCount: assessmentStats.byRiskLevel['Normal/No Risk']?.uniqueStudents || 0,
      atRiskCount: assessmentStats.byRiskLevel['At-risk']?.uniqueStudents || 0,
      highRiskCount: assessmentStats.byRiskLevel['High risk']?.uniqueStudents || 0,
      selfHarmCount
    };
    
    res.render('counselor/dashboard', {
      title: 'Counselor Dashboard',
      appName: req.app.locals.appName,
      counselor: req.session.counselor,
      students,
      stats,
      filters,
      sections: config.schoolConfig.sections,
      batches: config.schoolConfig.batches
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    req.session.errors = [{ msg: 'An error occurred loading the dashboard' }];
    res.redirect('/');
  }
});

/**
 * GET /counselor/student/:id - View individual student
 */
router.get('/student/:id', requireAuth, (req, res) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    
    // Get student info
    const student = findStudentById(studentId);
    
    if (!student) {
      req.session.errors = [{ msg: 'Student not found' }];
      return res.redirect('/counselor/dashboard');
    }
    
    // Get all assessments for this student
    const assessments = getAssessmentsByStudentId(studentId);
    
    // Log this access
    logAccess(req.session.counselor.id, studentId, 'viewed_detail');
    
    res.render('counselor/student', {
      title: `Student: ${student.name}`,
      appName: req.app.locals.appName,
      counselor: req.session.counselor,
      student,
      assessments
    });
    
  } catch (error) {
    console.error('Student view error:', error);
    req.session.errors = [{ msg: 'An error occurred loading student details' }];
    res.redirect('/counselor/dashboard');
  }
});

module.exports = router;
