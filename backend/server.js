const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./student/models/UserModel');
const assignmentRoutes = require('./student/routes/assignmentRoutes');
const calendarRoutes = require('./student/routes/calendarRoutes');
const courseRoutes = require('./student/routes/courseRoutes');
const notificationRoutes = require('./student/routes/notificationRoutes');
const quizRoutes = require('./student/routes/quizRoutes');
const studentRoutes = require('./student/routes/studentRoutes');
const loggingMiddleware = require('./student/middlewares/loggingMiddleware');
const errorHandler = require('./student/middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware); // Use logging middleware

// MongoDB Connection
mongoose
  .connect('mongodb+srv://mabdullahiqbal1133:abi54321@webproject.zhlok.mongodb.net/')
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes for authentication
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Routes for other modules
app.use('/api/assignments', assignmentRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/students', studentRoutes);

// Use the error handler middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
