import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap, 
  LayoutDashboard, 
  MessageSquare, 
  Users2 
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BookOpen, label: 'My Courses', path: '/courses' },
  { icon: Calendar, label: 'Schedule', path: '/schedule' },
  { icon: FileText, label: 'Assignments', path: '/assignments' },
  { icon: GraduationCap, label: 'Certifications', path: '/certifications' },
  { icon: Users2, label: 'Group Projects', path: '/projects' },
  { icon: MessageSquare, label: 'Discussions', path: '/discussions' },
];

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-semibold text-gray-900">EduPortal</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}