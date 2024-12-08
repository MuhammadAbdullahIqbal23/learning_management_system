const User = require('../student/models/UserModel');

const roleMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = req.user; // Get the authenticated user

      // Check if the user is authenticated
      if (!user) {
        return res.status(401).json({ success: false, message: 'Please authenticate.' });
      }

      // Check if the user's role is allowed
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
      }

      next(); // User has the correct role, so proceed to the next middleware
    } catch (error) {
      console.error('Role Middleware error:', error);
      res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
  };
};

module.exports = roleMiddleware;
