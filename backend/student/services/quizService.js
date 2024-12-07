const Quiz = require('../models/Quiz');

exports.createQuiz = async (quizData) => {
  const quiz = new Quiz(quizData);
  return await quiz.save();
};

exports.getQuizzesByCourse = async (courseId) => {
  return await Quiz.find({ courseId });
};

exports.getQuizById = async (id) => {
  return await Quiz.findById(id);
};

exports.updateQuiz = async (id, updateData) => {
  return await Quiz.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteQuiz = async (id) => {
  return await Quiz.findByIdAndDelete(id);
};
