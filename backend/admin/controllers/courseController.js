const Course = require('../models/Course');

// Create a new course
exports.createCourse = async (req, res) => {
  const { title, description, instructor } = req.body;

  try {
    const newCourse = new Course({ title, description, instructor });
    await newCourse.save();
    res.status(201).json({ success: true, message: 'Course created successfully', course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Fetch all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username');
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await Course.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// Get course by ID
exports.getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate('instructor', 'username');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get courses by category (assuming category is a field in the course schema)
exports.getCoursesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const courses = await Course.find({ category }).populate('instructor', 'username');
    if (courses.length === 0) {
      return res.status(404).json({ success: false, message: 'No courses found in this category' });
    }
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
