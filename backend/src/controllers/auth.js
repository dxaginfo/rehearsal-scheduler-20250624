const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { User } = require('../models');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

// Register a new user
exports.register = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, timeZone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new AppError('User with this email already exists', 400));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      email,
      password: passwordHash,
      name,
      timeZone: timeZone || 'UTC'
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        timeZone: user.timeZone,
        token
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        timeZone: user.timeZone,
        token
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

// Refresh token
exports.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return next(new AppError('No token provided', 400));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Generate new token
    const newToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.status(200).json({
      success: true,
      data: {
        token: newToken
      }
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new AppError('Invalid or expired token', 401));
    }
    logger.error('Token refresh error:', error);
    next(error);
  }
};

// Logout user
exports.logout = (req, res) => {
  // In a stateless JWT setup, the client is responsible for removing the token
  // Server-side we just return a success response
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};