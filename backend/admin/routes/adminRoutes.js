const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware); // Apply authentication to all admin routes
router.use(roleMiddleware(['admin'])); // Apply admin role check to all admin routes

router.get('/users', adminController.getAllUsers);
router.delete('/user/:id', adminController.deleteUser);

module.exports = router;
