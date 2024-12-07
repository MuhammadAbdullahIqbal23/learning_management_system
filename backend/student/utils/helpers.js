const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret Key for JWT (use environment variables for production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// 1. Hash Password
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// 2. Compare Password
exports.comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// 3. Generate JWT Token
exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); // Token valid for 1 day
};

// 4. Verify JWT Token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// 5. Format API Response
exports.formatResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data,
  };
};

// 6. Error Handler for Async Functions
exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 7. Validate Email
exports.validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// 8. Paginate Results
exports.paginate = (query, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return query.skip(offset).limit(limit);
};

// 9. Capitalize String
exports.capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// 10. Check Role Authorization
exports.isAuthorized = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

// 11. Generate Random String (e.g., for passwords or codes)
exports.generateRandomString = (length = 8) => {
  return Math.random().toString(36).substr(2, length);
};

// 12. Log Errors (For better debugging in production)
exports.logError = (error) => {
  console.error(`[${new Date().toISOString()}] - ${error.message}`);
};
