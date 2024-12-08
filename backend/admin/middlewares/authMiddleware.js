const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate user using JWT
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    const user = await User.findById(decoded.id).select('-password'); // Find user in DB, exclude password field

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request
    req.user = user;

    // Optional: Handle token expiration/refresh logic
    // Example: Check if token is about to expire, and provide new token
    /*
    const isTokenExpiringSoon = decoded.exp - Date.now() / 1000 < TOKEN_REFRESH_THRESHOLD;
    if (isTokenExpiringSoon) {
      const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.setHeader('Authorization', `Bearer ${newToken}`);
    }
    */

    next();
  } catch (error) {
    // Log error if in development mode
    if (process.env.NODE_ENV === 'development') {
      console.error('Authentication error:', error);
    }

    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check admin role
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin rights required.' });
  }
};

// Middleware to check roles dynamically
const roleMiddleware = (roles = []) => {
  return (req, res, next) => {
    if (!roles.length || (req.user && roles.includes(req.user.role))) {
      next();
    } else {
      res.status(403).json({ message: `Access denied. ${roles.join(', ')} role(s) required.` });
    }
  };
};

module.exports = { authMiddleware, adminMiddleware, roleMiddleware };
