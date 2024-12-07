import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Users as UsersIcon, 
  Edit, 
  Trash2, 
  PlusCircle, 
  AlertTriangle 
} from 'lucide-react';

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f4f6f9;
  }
`;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #e9f0f9 0%, #d6e2f0 100%);
  padding: 2rem;
  box-sizing: border-box;
`;

const UserManagementCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const PageHeader = styled.div`
  background-color: #3b82f6;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
  }
`;

const AddUserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #3b82f6;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    background-color: #f3f4f6;
    color: #374151;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  tbody tr {
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9fafb;
    }
  }
`;

const RoleBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;

  ${props => {
    switch(props.role) {
      case 'admin':
        return 'background-color: #fee2e2; color: #b91c1c;';
      case 'instructor':
        return 'background-color: #d1fae5; color: #064e3b;';
      default:
        return 'background-color: #e0f2fe; color: #0c4a6e;';
    }
  }}
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.color || '#3b82f6'};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.hoverColor || '#2563eb'};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const CancelButton = styled.button`
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e5e7eb;
  }
`;
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

  // Function to get the authentication token
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Function to handle token-related errors
  const handleTokenError = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchUsers = async () => {
    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      const response = await axios.get('http://localhost:5002/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
      setLoading(false);

      if (err.response?.status === 401) {
        handleTokenError();
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    const token = getToken();
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      await axios.delete(`http://localhost:5002/api/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(users.filter((user) => user._id !== id));
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      
      if (err.response?.status === 401) {
        handleTokenError();
        return;
      }
      
      alert(err.response?.data?.message || 'Error deleting user');
    }
  };

  const openModal = (user = null) => {
    if (user) {
      setCurrentUser({
        username: user.username,
        role: user.role,
        _id: user._id
      });
      setIsEditing(true);
    } else {
      setCurrentUser({
        username: '',
        role: 'student',
        _id: null
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
  
    if (!token) {
      handleTokenError();
      return;
    }
  
    try {
      // Trim username to remove any leading/trailing whitespace
      const trimmedUsername = currentUser.username.trim();
  
      // Frontend check for existing username
      const usernameExists = users.some(
        user => user.username.toLowerCase() === trimmedUsername.toLowerCase()
      );
  
      if (usernameExists && !isEditing) {
        alert('A user with this username already exists.');
        return;
      }
  
      if (isEditing) {
        // Update user
        const response = await axios.put(
          `http://localhost:5002/api/admin/user/${currentUser._id}`,
          { ...currentUser, username: trimmedUsername },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setUsers(users.map((user) => (user._id === currentUser._id ? response.data.user : user)));
        alert('User updated successfully');
      } else {
        // Add new user
        const newUser = {
          username: trimmedUsername,
          role: currentUser.role,
          password: currentUser.password,
        };
        
        const response = await axios.post(
          'http://localhost:5002/api/admin/users',
          newUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setUsers([...users, response.data.user]);
        alert('User created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving user:', err);
      
      if (err.response?.status === 401) {
        handleTokenError();
        return;
      }
      
      // More specific error handling
      if (err.response?.data?.message.includes('username already exists')) {
        alert('A user with this username already exists.');
      } else {
        alert(err.response?.data?.message || 'Error saving user');
      }
    }
  };  

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-blue-600 font-semibold">Loading Users...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-red-50">
      <div className="bg-white shadow-xl rounded-lg p-8 text-center border-2 border-red-200">
        <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
        <p className="text-red-600 font-bold text-lg">{error}</p>
      </div>
    </div>
  );

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <UserManagementCard>
          <PageHeader>
            <HeaderTitle>
              <UsersIcon size={32} />
              <h1>User Management</h1>
            </HeaderTitle>
            <AddUserButton onClick={() => openModal()}>
              <PlusCircle size={18} />
              Add New User
            </AddUserButton>
          </PageHeader>

          <UserTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>
                    <RoleBadge role={user.role}>
                      {user.role}
                    </RoleBadge>
                  </td>
                  <td>
                    <ActionButton 
                      onClick={() => openModal(user)}
                      color="#3b82f6"
                      hoverColor="#2563eb"
                    >
                      <Edit size={18} />
                    </ActionButton>
                    <ActionButton 
                      onClick={() => deleteUser(user._id)}
                      color="#ef4444"
                      hoverColor="#dc2626"
                    >
                      <Trash2 size={18} />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </UserTable>
        </UserManagementCard>

        {isModalOpen && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                ✕
              </CloseButton>
              <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
              <Form onSubmit={handleSubmit}>
                <div>
                  <label>Username</label>
                  <input
                    type="text"
                    value={currentUser.username}
                    onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Role</label>
                  <select
                    value={currentUser.role}
                    onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                    required
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {!isEditing && (
                  <div>
                    <label>Password</label>
                    <input
                      type="password"
                      onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                      required
                    />
                  </div>
                )}
                <FormActions>
                  <CancelButton type="button" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </CancelButton>
                  <SubmitButton type="submit">
                    {isEditing ? 'Update' : 'Add'}
                  </SubmitButton>
                </FormActions>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </PageContainer>
    </>
  );
};

export default ManageUsers;