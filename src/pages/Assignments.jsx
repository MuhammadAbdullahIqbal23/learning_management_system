import React from 'react';
import { Calendar, FileText } from 'lucide-react';

const assignments = [
  {
    id: '1',
    title: 'React Hooks Implementation',
    course: 'Advanced Web Development',
    dueDate: '2024-03-20',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Neural Network Design',
    course: 'Machine Learning Fundamentals',
    dueDate: '2024-03-18',
    status: 'submitted',
  },
  {
    id: '3',
    title: 'Graph Algorithm Analysis',
    course: 'Data Structures & Algorithms',
    dueDate: '2024-03-15',
    status: 'graded',
    grade: 'A',
  },
];

const AssignmentCard = ({ assignment }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{assignment.title}</h3>
          <p className="text-sm text-gray-600">{assignment.course}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles(assignment.status)}`}>
          {assignment.status}
        </span>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
        </div>
        {assignment.grade && (
          <div className="flex items-center space-x-1">
            <FileText className="h-4 w-4" />
            <span>Grade: {assignment.grade}</span>
          </div>
        )}
      </div>

      <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
        View Details
      </button>
    </div>
  );
};

const Assignments = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Submit Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default Assignments;