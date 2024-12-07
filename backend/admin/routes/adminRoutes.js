const express = require('express');
const router = express.Router();
const { Student, Course } = require('../models'); // Assuming you have the Student and Course models defined

// Admin Dashboard API Route
router.get('/dashboard', async (req, res) => {
  try {
    // Fetch data
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const activeEnrollments = 120; // Example value, replace with real data
    const latestActivities = [
      'Student John Doe enrolled in Course 101',
      'Instructor Jane Smith added a new course: Web Development',
      'Student Mark Lee completed Course 102'
    ]; // Example data

    // Send data to frontend
    res.json({
      totalStudents,
      totalCourses,
      activeEnrollments,
      latestActivities
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
