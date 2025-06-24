const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth');

// Register a new user
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').not().isEmpty().withMessage('Name is required')
  ],
  authController.register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  authController.login
);

// Refresh token
router.post('/refresh-token', authController.refreshToken);

// Logout
router.post('/logout', authController.logout);

module.exports = router;