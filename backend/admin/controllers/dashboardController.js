const Student = require("../models/Student");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const getDashboardData = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const activeEnrollments = await Enrollment.countDocuments({ status: "active" });

    res.json({
      totalStudents,
      totalCourses,
      activeEnrollments,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardData };
