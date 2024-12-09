import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface LectureUploaderProps {
  onClose: () => void;
  onUpload: (data: { title: string; type: 'video' | 'audio' | 'document'; file: File }) => void;
}

const LectureUploader: React.FC<LectureUploaderProps> = ({ onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'video' | 'audio' | 'document'>('video');
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && type && file) {
      onUpload({ title, type, file });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Upload New Lecture</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lecture Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter lecture title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'video' | 'audio' | 'document')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="document">Document</option>
            </select>
          </div>

          <div 
            className={`mb-6 p-8 border-2 border-dashed rounded-lg text-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex items-center justify-center gap-2">
                <Upload className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{file.name}</span>
              </div>
            ) : (
              <div>
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Drag and drop your file here, or click to browse</p>
              </div>
            )}
            <input
              type="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
              className="hidden"
              accept={
                type === 'video' ? 'video/*' :
                type === 'audio' ? 'audio/*' :
                '.pdf,.doc,.docx'
              }
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title || !file}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload Lecture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LectureUploader;