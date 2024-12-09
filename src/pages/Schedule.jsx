import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  {
    title: 'React Hooks Deep Dive',
    course: 'Advanced Web Development',
    time: '02:00 PM',
    type: 'lecture',
  },
  {
    title: 'Graph Algorithms',
    course: 'Data Structures & Algorithms',
    time: '04:30 PM',
    type: 'lecture',
  },
  {
    title: 'Neural Networks',
    course: 'Machine Learning Fundamentals',
    time: '10:00 AM',
    type: 'lecture',
  },
];

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - date.getDay() + i);
    return date;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            today
          </button>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-sm font-medium">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg">
              month
            </button>
            <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg">
              week
            </button>
            <button className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg">
              day
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-7 border-b">
          {daysInWeek.map((date) => (
            <div
              key={date.toISOString()}
              className="px-4 py-3 text-center border-r last:border-r-0"
            >
              <div className="text-sm text-gray-500">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        <div className="divide-y">
          {events.map((event) => (
            <div
              key={event.title}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 text-sm text-gray-600">{event.time}</div>
                <div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.course}</p>
                </div>
                <span className={`ml-auto px-3 py-1 text-xs font-medium rounded-full ${
                  event.type === 'lecture'
                    ? 'bg-blue-100 text-blue-800'
                    : event.type === 'assignment'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}