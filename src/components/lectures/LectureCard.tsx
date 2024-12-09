import React from 'react';
import { Lecture } from '../../types';
import { Play, FileText, Volume2, Clock, MoreVertical } from 'lucide-react';

interface LectureCardProps {
  lecture: Lecture;
  onPlay: (lecture: Lecture) => void;
}

const LectureCard: React.FC<LectureCardProps> = ({ lecture, onPlay }) => {
  const getIcon = () => {
    switch (lecture.type) {
      case 'video':
        return <Play className="h-5 w-5 text-blue-600" />;
      case 'audio':
        return <Volume2 className="h-5 w-5 text-green-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-orange-600" />;
    }
  };

  const getTypeColor = () => {
    switch (lecture.type) {
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'audio':
        return 'bg-green-100 text-green-800';
      case 'document':
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${lecture.type === 'video' ? 'bg-blue-50' : lecture.type === 'audio' ? 'bg-green-50' : 'bg-orange-50'}`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-medium">{lecture.title}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor()}`}>
                {lecture.type.charAt(0).toUpperCase() + lecture.type.slice(1)}
              </span>
              {lecture.duration && (
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {Math.floor(lecture.duration / 60)}:{String(lecture.duration % 60).padStart(2, '0')}
                </span>
              )}
            </div>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <MoreVertical className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => onPlay(lecture)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {lecture.type === 'document' ? 'View Document' : 'Play Now'}
        </button>
      </div>
    </div>
  );
};

export default LectureCard;