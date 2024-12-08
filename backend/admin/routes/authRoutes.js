const express = require('express');
const path = require('path');
const cors = require('cors');
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

// Logout route
router.get('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;