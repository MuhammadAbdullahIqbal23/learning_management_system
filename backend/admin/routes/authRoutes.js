const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require(path.resolve(__dirname, '../controllers/authController'));
const {
  validateRegistration,
  validateLogin,
  handleValidationErrors,
} = require(path.resolve(__dirname, '../utils/validation'));

// User Registration Route
router.post('/register', validateRegistration, handleValidationErrors, authController.register);

// User Login Route
router.post('/login', validateLogin, handleValidationErrors, authController.login);

module.exports = router;
