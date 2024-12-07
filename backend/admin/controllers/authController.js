const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const sendResponse = (res, status, success, message, data = {}) => {
  res.status(status).json({ success, message, ...data });
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  console.log(`register ${username} ${password} ${ role }`); 
  if (!username || !password || !role) {
    return sendResponse(res, 400, false, 'All fields are required.');
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return sendResponse(res, 400, false, 'Username already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();
    return sendResponse(res, 201, true, 'User registered successfully.');
  } catch (err) {
    console.error('Error during registration:', err.message);
    return sendResponse(res, 500, false, 'Internal server error. Please try again later.');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return sendResponse(res, 400, false, 'Username and password are required.');
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return sendResponse(res, 404, false, 'User not found.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, 'Invalid credentials.');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    return sendResponse(res, 200, true, 'Login successful.', {
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    return sendResponse(res, 500, false, 'Internal server error. Please try again later.');
  }
};
