import React from 'react';
import { Users, BookOpen, FileText, TrendingUp } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import CourseCard from '../components/dashboard/CourseCard';

const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    totalStudents: 156,
    totalLectures: 24,
    progress: 85
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Master the basics of data science, statistics, and machine learning.',
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    totalStudents: 89,
    totalLectures: 18,
    progress: 60
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn modern design principles and create beautiful user interfaces.',
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
    totalStudents: 124,
    totalLectures: 20,
    progress: 40
  }
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Arfeen!</h1>
        <p className="text-gray-600">Here's what's happening with your courses today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value="369"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Courses"
          value="8"
          icon={BookOpen}
          trend={{ value: 4, isPositive: true }}
        />
        <StatsCard
          title="Assignments"
          value="24"
          icon={FileText}
          trend={{ value: 2, isPositive: false }}
        />
        <StatsCard
          title="Completion Rate"
          value="76%"
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Active Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;