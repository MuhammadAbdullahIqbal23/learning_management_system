import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: '',
    role: 'student',
    _id: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      // Retrieve the token from localStorage
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTNmMDM5NWU3MjcwMmNlYzFiOGNjMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMzU1Nzk0NiwiZXhwIjoxNzMzNTYxNTQ2fQ.qyOvgY2X7hkrUICT4ovTBz1EnYFRd5Jxf9O0SuaKtj0";

      // Check if token exists
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      // Make API call with token in Authorization header
      const response = await axios.get('http://localhost:5002/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      
      // Handle token expiration or unauthorized access
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }

      setError(err.response?.data?.message || 'Failed to load users');
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  // Delete user
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTNmMDM5NWU3MjcwMmNlYzFiOGNjMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMzU1Nzk0NiwiZXhwIjoxNzMzNTYxNTQ2fQ.qyOvgY2X7hkrUICT4ovTBz1EnYFRd5Jxf9O0SuaKtj0";

      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      await axios.delete(`http://localhost:5002/api/admin/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setUsers(users.filter(user => user._id !== id));
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      alert(err.response?.data?.message || 'Error deleting user');
    }
  };

  // Open modal for adding/editing user
  const openModal = (user = null) => {
    if (user) {
      // Editing existing user
      setCurrentUser({
        username: user.username,
        role: user.role,
        _id: user._id
      });
      setIsEditing(true);
    } else {
      // Adding new user
      setCurrentUser({
        username: '',
        role: 'student',
        _id: null
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  // Handle form submission (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTNmMDM5NWU3MjcwMmNlYzFiOGNjMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMzU1Nzk0NiwiZXhwIjoxNzMzNTYxNTQ2fQ.qyOvgY2X7hkrUICT4ovTBz1EnYFRd5Jxf9O0SuaKtj0";

      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      if (isEditing) {
        // Update user
        const response = await axios.put(
          `http://localhost:5002/api/admin/user/${currentUser._id}`, 
          currentUser,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Update users list
        setUsers(users.map(user => 
          user._id === currentUser._id ? response.data.user : user
        ));
        
        alert('User updated successfully');
      } else {
        // Create new user
        const response = await axios.post(
          'http://localhost:5002/api/admin/users', 
          currentUser,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Add new user to list
        setUsers([...users, response.data.user]);
        
        alert('User created successfully');
      }

      // Close modal
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving user:', err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      alert(err.response?.data?.message || 'Error saving user');
    }
  };

  // Render loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button 
          onClick={() => openModal()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New User
        </button>
      </div>

      {/* User List Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2 space-x-2">
                <button 
                  onClick={() => openModal(user)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteUser(user._id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  value={currentUser.username}
                  onChange={(e) => setCurrentUser({
                    ...currentUser, 
                    username: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Role</label>
                <select
                  value={currentUser.role}
                  onChange={(e) => setCurrentUser({
                    ...currentUser, 
                    role: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="student">student</option>
                  <option value="instructor">instructor</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;