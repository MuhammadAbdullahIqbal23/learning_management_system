const Course = require('../models/Course');

exports.createCourse = async (courseData) => {
  const course = new Course(courseData);
  return await course.save();
};

exports.getAllCourses = async () => {
  return await Course.find();
};

exports.getCourseById = async (id) => {
  return await Course.findById(id);
};

exports.updateCourse = async (id, updateData) => {
  return await Course.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};
