const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require(path.resolve(__dirname, '../controllers/adminController'));
const authMiddleware = require(path.resolve(__dirname, '../middlewares/authMiddleware'));
const roleMiddleware = require(path.resolve(__dirname, '../middlewares/roleMiddleware'));

// Apply authentication middleware to all admin routes
router.use(authMiddleware);

// Apply admin role check middleware to all admin routes
router.use(roleMiddleware(['admin']));

// Admin routes
router.get('/users', adminController.getAllUsers);
router.delete('/user/:id', adminController.deleteUser);

module.exports = router;
