const Course = require('../models/Course');

// Fetch courses created by the instructor
exports.getInstructorCourses = async (req, res) => {
  const { instructorId } = req.params;

  try {
    const courses = await Course.find({ instructor: instructorId });
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Upload lecture content
exports.uploadLecture = async (req, res) => {
  const { courseId, title, content } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    course.lectures.push({ title, content });
    await course.save();
    res.status(200).json({ success: true, message: 'Lecture uploaded successfully', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
