const express = require('express');
const path = require('path');
const cors = require('cors'); // Added CORS
const router = express.Router();
const authController = require(path.resolve(__dirname, '../controllers/authController'));
const {
  validateRegistration,
  validateLogin,
  handleValidationErrors,
} = require(path.resolve(__dirname, '../utils/validation'));

// Middleware
router.use(cors({ origin: 'http://localhost:3000' })); // CORS for frontend requests

// User Registration Route
router.post('/register', validateRegistration, handleValidationErrors, authController.register);

// User Login Route
router.post('/login', validateLogin, handleValidationErrors, authController.login);

// Initiate Google OAuth
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Redirect with token to frontend
    res.redirect(`http://localhost:3000/oauth-callback?token=${req.user.token}`);
  }
);
// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
