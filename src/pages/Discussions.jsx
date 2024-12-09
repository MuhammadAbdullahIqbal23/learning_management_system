import React from 'react';
import { MessageSquare, ThumbsUp, Reply } from 'lucide-react';

const discussions = [
  {
    id: '1',
    title: 'Understanding React Hooks',
    author: { name: 'John Doe' },
    course: 'Advanced Web Development',
    date: '2024-03-15',
    content: 'Can someone explain the difference between useEffect and useLayoutEffect?',
    likes: 12,
    replies: 5,
    tags: ['react', 'hooks', 'javascript'],
  },
  {
    id: '2',
    title: 'Neural Network Architecture',
    author: { name: 'Sarah Wilson' },
    course: 'Machine Learning Fundamentals',
    date: '2024-03-14',
    content: 'What are the best practices for designing neural network architectures for image classification?',
    likes: 8,
    replies: 3,
    tags: ['machine-learning', 'neural-networks', 'deep-learning'],
  },
  {
    id: '3',
    title: 'Graph Algorithm Complexity',
    author: { name: 'Mike Johnson' },
    course: 'Data Structures & Algorithms',
    date: '2024-03-13',
    content: 'How do we analyze the time complexity of Dijkstra\'s algorithm with different data structures?',
    likes: 15,
    replies: 7,
    tags: ['algorithms', 'graphs', 'complexity'],
  },
];

const Discussions = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Discussions</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          New Discussion
        </button>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{discussion.title}</h3>
                <p className="text-sm text-gray-600">{discussion.course}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <ThumbsUp className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-600">{discussion.likes}</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">{discussion.content}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {discussion.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{discussion.replies} replies</span>
                </div>
                <span>
                  Posted on {new Date(discussion.date).toLocaleDateString()}
                </span>
              </div>

              <button className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700">
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussions;