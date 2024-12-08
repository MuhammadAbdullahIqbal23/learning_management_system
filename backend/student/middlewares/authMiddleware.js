const jwt = require('jsonwebtoken');
const User = require('../student/models/UserModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token not found. Please authenticate.' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ success: false, message: 'Invalid token. Please authenticate.' });
    }

    // Check if the token is expired
    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    if (decodedToken.exp < now) {
      return res.status(401).json({ success: false, message: 'Token has expired. Please authenticate again.' });
    }

    // Find the user by ID from the decoded token
    const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token });
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found. Please authenticate.' });
    }

    // Attach user info to the request object for further use in the route handlers
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

module.exports = authMiddleware;
