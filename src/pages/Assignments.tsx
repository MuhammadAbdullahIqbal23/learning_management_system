import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import AssignmentCard from '../components/assignments/AssignmentCard';
import AssignmentForm from '../components/assignments/AssignmentForm';
import { Assignment } from '../types';

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Build a React Portfolio',
    courseId: '1',
    dueDate: '2024-03-25T23:59:59',
    submissions: 12,
    status: 'active'
  },
  {
    id: '2',
    title: 'Data Analysis Project',
    courseId: '2',
    dueDate: '2024-03-28T23:59:59',
    submissions: 8,
    status: 'active'
  },
  {
    id: '3',
    title: 'UI Design Case Study',
    courseId: '3',
    dueDate: '2024-03-20T23:59:59',
    submissions: 15,
    status: 'closed'
  },
  {
    id: '4',
    title: 'JavaScript Algorithms',
    courseId: '1',
    dueDate: '2024-04-01T23:59:59',
    submissions: 0,
    status: 'draft'
  }
];

const Assignments = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateAssignment = (data: {
    title: string;
    description: string;
    dueDate: string;
    courseId: string;
  }) => {
    console.log('Creating assignment:', data);
    setShowForm(false);
  };

  const handleViewAssignment = (id: string) => {
    console.log('Viewing assignment:', id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Assignment
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredAssignments.map(assignment => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onView={handleViewAssignment}
          />
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No assignments found matching your criteria.</p>
        </div>
      )}

      {showForm && (
        <AssignmentForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreateAssignment}
        />
      )}
    </div>
  );
};

export default Assignments;