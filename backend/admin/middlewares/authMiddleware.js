const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you want to fetch user details after verification

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret'); // Replace 'defaultSecret' with an env variable
    req.user = await User.findById(decoded.id).select('-password'); // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
