const Progress = require('../models/Progress');

exports.updateProgress = async (userId, courseId, progressData) => {
  const progress = await Progress.findOneAndUpdate(
    { userId, courseId },
    progressData,
    { new: true, upsert: true } // Create if not found
  );
  return progress;
};

exports.getProgressByUserAndCourse = async (userId, courseId) => {
  return await Progress.findOne({ userId, courseId });
};
