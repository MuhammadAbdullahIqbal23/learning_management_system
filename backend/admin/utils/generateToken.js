const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for authentication.
 * @param {Object} payload - The data to encode in the token.
 * @param {string} secret - The secret key for signing the token.
 * @param {string} expiresIn - Token expiration duration (e.g., '1d', '2h').
 * @returns {string} - The signed JWT token.
 */
const generateToken = (payload, secret = process.env.JWT_SECRET || 'defaultSecret', expiresIn = '1d') => {
  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = generateToken;
