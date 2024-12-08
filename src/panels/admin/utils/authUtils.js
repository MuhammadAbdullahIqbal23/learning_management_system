import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get user role from token (if you're storing role in token)
export const getUserRole = () => {
  const token = getToken();
  if (token) {
    try {
      // Decode token and extract role
      const decoded = jwtDecode(token);
      console.log("Decoded jwt code",decoded);
      return decoded.role;
    } catch (error) {
      return null;
    }
  }
  return null;
};

// Function to get current user
export const getCurrentUser = async () => {
  try {
    const token = getToken();
    if (!token) return null;

    const response = await axios.get('http://localhost:5002/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data.user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Function to logout
export const logout = (navigate) => {
  removeToken();
  if (navigate) {
    navigate('/login');
  }
};