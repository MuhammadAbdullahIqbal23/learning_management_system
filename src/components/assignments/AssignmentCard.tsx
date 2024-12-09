import React from 'react';
import { Calendar, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { Assignment } from '../../types';
import { format } from 'date-fns';

interface AssignmentCardProps {
  assignment: Assignment;
  onView: (id: string) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onView }) => {
  const getStatusColor = () => {
    switch (assignment.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = () => {
    switch (assignment.status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'draft':
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      case 'closed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-lg">{assignment.title}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Due {format(new Date(assignment.dueDate), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{assignment.submissions} submissions</span>
            </div>
          </div>
        </div>
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {getStatusIcon()}
          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
        </span>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => onView(assignment.id)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;