const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const userRoutes = require('./users');
const bandRoutes = require('./bands');
const rehearsalRoutes = require('./rehearsals');
const songRoutes = require('./songs');
const setlistRoutes = require('./setlists');

// Route middlewares
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/bands', bandRoutes);
router.use('/rehearsals', rehearsalRoutes);
router.use('/songs', songRoutes);
router.use('/setlists', setlistRoutes);

// Base route for API
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Rehearsal Scheduler API',
    version: '1.0.0',
    docs: '/api/docs'
  });
});

module.exports = router;