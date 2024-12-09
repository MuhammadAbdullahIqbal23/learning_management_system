import { BookOpen, Clock, GraduationCap, Target } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import CourseCard from '../components/dashboard/CourseCard';

const courses = [
  {
    title: 'Advanced Web Development',
    instructor: 'Dr. Sarah Johnson',
    progress: 75,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
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
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
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
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
    students: 2156,
    duration: '10 weeks',
    nextLesson: {
      title: 'Graph Algorithms',
      time: 'Today, 4:30 PM',
    },
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<BookOpen className="h-6 w-6 text-indigo-600" />}
          title="Enrolled Courses"
          value="6"
          change={{ value: '12%', positive: true }}
        />
        <StatsCard
          icon={<Clock className="h-6 w-6 text-indigo-600" />}
          title="Hours Learned"
          value="32.5h"
          change={{ value: '8%', positive: true }}
        />
        <StatsCard
          icon={<GraduationCap className="h-6 w-6 text-indigo-600" />}
          title="Certifications"
          value="3"
        />
        <StatsCard
          icon={<Target className="h-6 w-6 text-indigo-600" />}
          title="Course Completion"
          value="85%"
          change={{ value: '5%', positive: true }}
        />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}