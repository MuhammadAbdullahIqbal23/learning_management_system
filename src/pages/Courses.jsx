import React from 'react';
import { Filter, Search, Clock, Users } from 'lucide-react';

const CourseCard = ({ title, instructor, progress, image, students, duration, nextLesson }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src="/api/placeholder/800/400"
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{instructor}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        {nextLesson && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900">Next Lesson</h4>
            <p className="mt-1 text-sm text-gray-600">{nextLesson.title}</p>
            <p className="text-sm text-indigo-600">{nextLesson.time}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const courses = [
  {
    title: 'Advanced Web Development',
    instructor: 'Dr. Sarah Johnson',
    progress: 75,
    image: '/api/placeholder/800/400',
    students: 1234,
    duration: '12 weeks',
    nextLesson: {
      title: 'React Hooks Deep Dive',
      time: 'Today, 2:00 PM',
    },
  },
  {
    title: 'Machine Learning Fundamentals',
    instructor: 'Prof. Michael Chen',
    progress: 45,
    image: '/api/placeholder/800/400',
    students: 892,
    duration: '16 weeks',
    nextLesson: {
      title: 'Neural Networks',
      time: 'Tomorrow, 10:00 AM',
    },
  },
  {
    title: 'Data Structures & Algorithms',
    instructor: 'Dr. Alex Thompson',
    progress: 90,
    image: '/api/placeholder/800/400',
    students: 2156,
    duration: '10 weeks',
    nextLesson: {
      title: 'Graph Algorithms',
      time: 'Today, 4:30 PM',
    },
  },
  {
    title: 'Mobile App Development',
    instructor: 'Prof. Emily White',
    progress: 30,
    image: '/api/placeholder/800/400',
    students: 1567,
    duration: '14 weeks',
    nextLesson: {
      title: 'UI/UX Design Principles',
      time: 'Tomorrow, 1:00 PM',
    },
  },
];

const Courses = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="relative w-full max-w-xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;