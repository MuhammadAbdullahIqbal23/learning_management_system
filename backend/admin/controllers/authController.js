const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Utility function to send a structured response
const sendResponse = (res, status, success, message, data = {}) => {
  res.status(status).json({ success, message, ...data });
};

// User Registration
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return sendResponse(res, 400, false, 'Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    return sendResponse(res, 201, true, 'User registered successfully');
  } catch (err) {
    console.error('Error during registration:', err);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

// User Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, 'Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return sendResponse(res, 200, true, 'Login successful', {
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error('Error during login:', err);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};
