const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./admin/routes/authRoutes');
const adminRoutes = require('./admin/routes/adminRoutes');
const instructorRoutes = require('./admin/routes/instructorRoutes');
const studentRoutes = require('./admin/routes/studentRoutes');
const courseRoutes = require('./admin/routes/courseRoutes');
const errorMiddleware = require('./admin/middlewares/errorMiddleware');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// API routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/admin', adminRoutes); // Admin-specific routes
app.use('/api/instructor', instructorRoutes); // Instructor-specific routes
app.use('/api/student', studentRoutes); // Student-specific routes
app.use('/api/courses', courseRoutes); // Course management routes

// Error handling middleware
app.use(errorMiddleware); // Catch-all error handler

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});