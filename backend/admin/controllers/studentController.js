const Course = require('../models/Course');

// Fetch enrolled courses for a student
exports.getEnrolledCourses = async (req, res) => {
  const { studentId } = req.params;

  try {
    const courses = await Course.find({ students: studentId });
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Submit assignment
exports.submitAssignment = async (req, res) => {
  const { courseId, studentId, assignment } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    course.assignments.push({ student: studentId, content: assignment });
    await course.save();
    res.status(200).json({ success: true, message: 'Assignment submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
