const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizcontroller'); // Correct path

router.post('/', quizController.createQuiz);          // Create a new quiz
router.get('/', quizController.getAllQuizzes);        // Get all quizzes
router.get('/:id', quizController.getQuizById);       // Get quiz by ID
router.put('/:id', quizController.updateQuiz);        // Update quiz
router.delete('/:id', quizController.deleteQuiz);     // Delete quiz

module.exports = router;