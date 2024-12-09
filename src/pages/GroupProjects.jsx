import React from 'react';
import { Users2, MessageSquare, GitBranch } from 'lucide-react';

const projects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    course: 'Advanced Web Development',
    members: [
      { name: 'John Doe', role: 'Team Lead' },
      { name: 'Jane Smith', role: 'Frontend Developer' },
      { name: 'Mike Johnson', role: 'Backend Developer' },
    ],
    deadline: '2024-04-15',
    progress: 65,
    status: 'active',
  },
  {
    id: '2',
    title: 'Image Recognition System',
    course: 'Machine Learning Fundamentals',
    members: [
      { name: 'Sarah Wilson', role: 'ML Engineer' },
      { name: 'Tom Brown', role: 'Data Scientist' },
      { name: 'Lisa Davis', role: 'UI Designer' },
    ],
    deadline: '2024-04-20',
    progress: 40,
    status: 'active',
  },
  {
    id: '3',
    title: 'Path Finding Visualizer',
    course: 'Data Structures & Algorithms',
    members: [
      { name: 'Alex Thompson', role: 'Algorithm Specialist' },
      { name: 'Emily White', role: 'Developer' },
    ],
    deadline: '2024-03-30',
    progress: 90,
    status: 'completed',
  },
];

const GroupProjects = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Group Projects</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Create New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.course}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  project.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {project.status}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users2 className="h-4 w-4" />
                <span>{project.members.length} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitBranch className="h-4 w-4" />
                <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex -space-x-2">
              {project.members.map((member, index) => (
                <div
                  key={member.name}
                  className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                  title={`${member.name} - ${member.role}`}
                >
                  <span className="text-xs font-medium">
                    {member.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                View Details
              </button>
              <button className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupProjects;