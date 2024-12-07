const Course = require('../models/Course');

// Create a new course
exports.createCourse = async (req, res) => {
  const { title, description, instructorId } = req.body;

  try {
    const newCourse = new Course({ title, description, instructor: instructorId });
    await newCourse.save();
    res.status(201).json({ success: true, course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Fetch courses created by the instructor
exports.getCoursesByInstructor = async (req, res) => {
  const { instructorId } = req.query;

  try {
    const courses = await Course.find({ instructor: instructorId });
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update course details
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
