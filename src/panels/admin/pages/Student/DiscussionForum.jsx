import React, { useEffect, useState } from 'react';

const DiscussionForum = () => {
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Fetch existing discussions
    fetch('/api/discussions')
      .then((res) => res.json())
      .then((data) => setDiscussions(data))
      .catch((err) => console.error(err));
  }, []);

  const handlePostSubmit = () => {
    const post = { content: newPost };
    fetch('/api/discussions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => setDiscussions((prev) => [...prev, data]))
      .catch((err) => console.error(err));
    setNewPost('');
  };

  return (
    <div>
      <h1>Discussion Forum</h1>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.id}>
            <p>{discussion.content}</p>
            <small>Posted by: {discussion.author}</small>
          </li>
        ))}
      </ul>
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write your post here..."
      ></textarea>
      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
};

export default DiscussionForum;
