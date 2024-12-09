import React, { useState } from 'react';
import { Course } from '../../types';

interface CourseDetailsModalProps {
  course: Course;
  onClose: () => void;
  onUpdate: (updatedCourse: Course) => void;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ course, onClose, onUpdate }) => {
  const [editedCourse, setEditedCourse] = useState(course);

  const handleSave = () => {
    onUpdate(editedCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{course.title}</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={editedCourse.title}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, title: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={editedCourse.description}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, description: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2"
          ></textarea>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
