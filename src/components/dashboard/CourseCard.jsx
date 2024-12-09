import React from 'react';
import PropTypes from 'prop-types';

const CourseCard = ({
  title,
  instructor,
  progress,
  image,
  students,
  duration,
  nextLesson,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">by {instructor}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {nextLesson && (
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm font-medium text-indigo-900">Next Lesson</p>
            <p className="text-sm text-indigo-700">{nextLesson.title}</p>
            <p className="text-xs text-indigo-600 mt-1">{nextLesson.time}</p>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span>{students} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{duration}</span>
          </div>
        </div>
        
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
          Continue Learning
        </button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  instructor: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  students: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  nextLesson: PropTypes.shape({
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  })
};

export default CourseCard;