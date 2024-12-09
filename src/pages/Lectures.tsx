import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import LectureCard from '../components/lectures/LectureCard';
import LectureUploader from '../components/lectures/LectureUploader';
import { Lecture } from '../types';

const mockLectures: Lecture[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    type: 'video',
    duration: 1845, // 30:45
    url: 'https://example.com/lecture1.mp4'
  },
  {
    id: '2',
    title: 'State Management Patterns',
    type: 'video',
    duration: 2400, // 40:00
    url: 'https://example.com/lecture2.mp4'
  },
  {
    id: '3',
    title: 'React Performance Tips',
    type: 'audio',
    duration: 1500, // 25:00
    url: 'https://example.com/lecture3.mp3'
  },
  {
    id: '4',
    title: 'Advanced React Patterns Guide',
    type: 'document',
    url: 'https://example.com/lecture4.pdf'
  }
];

const Lectures = () => {
  const [showUploader, setShowUploader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredLectures = mockLectures.filter(lecture => {
    const matchesType = selectedType === 'all' || lecture.type === selectedType;
    const matchesSearch = lecture.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleUpload = (data: { title: string; type: 'video' | 'audio' | 'document'; file: File }) => {
    console.log('Uploading lecture:', data);
    // Here you would typically handle the file upload to your backend
    setShowUploader(false);
  };

  const handlePlay = (lecture: Lecture) => {
    console.log('Playing lecture:', lecture);
    // Here you would typically handle playing the lecture content
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lectures</h1>
        <button
          onClick={() => setShowUploader(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Upload Lecture
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search lectures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="document">Document</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredLectures.map(lecture => (
          <LectureCard
            key={lecture.id}
            lecture={lecture}
            onPlay={handlePlay}
          />
        ))}
      </div>

      {filteredLectures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No lectures found matching your criteria.</p>
        </div>
      )}

      {showUploader && (
        <LectureUploader
          onClose={() => setShowUploader(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
};

export default Lectures;