import React, { useState, useEffect } from 'react';
import './styles.css'; // Use centralized styles file

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes from API
    const fetchQuizzes = async () => {
      // Example API call to fetch quizzes
      // const response = await fetch('/api/instructor/quizzes');
      // setQuizzes(response.data);
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="quiz-container">
      <h1>Quiz Management</h1>
      <table className="quizzes-table">
        <thead>
          <tr>
            <th>Quiz Title</th>
            <th>Number of Questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz._id}>
              <td>{quiz.title}</td>
              <td>{quiz.questions.length}</td>
              <td>
                <button className="btn">Edit</button>
                <button className="btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizManagement;
