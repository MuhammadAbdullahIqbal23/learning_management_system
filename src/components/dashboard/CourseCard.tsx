import React from 'react';
import { Course } from '../../types';
import { Users, Video } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <img 
        src={course.thumbnail} 
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {course.category}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.totalStudents} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            <span>{course.totalLectures} lectures</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {course.progress}% complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;