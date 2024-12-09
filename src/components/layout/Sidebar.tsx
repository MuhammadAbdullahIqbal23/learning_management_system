import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileVideo, 
  ClipboardList,
  Calendar,
  Bot,
  Award,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: FileVideo, label: 'Lectures', path: '/lectures' },
    { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Bot, label: 'AI Tutor', path: '/ai-tutor' },
    { icon: Award, label: 'Certifications', path: '/certifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8 px-2">
        <BookOpen className="h-8 w-8 text-blue-400" />
        <h1 className="text-xl font-bold">EduLMS</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;