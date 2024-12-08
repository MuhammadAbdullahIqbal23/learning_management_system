import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  useEffect(() => {
    // Example: Load authentication state from local storage or API
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setAuth({
        isAuthenticated: true,
        token: storedToken,
        user: JSON.parse(storedUser),
      });
    }
  }, []);

  const login = (token, user) => {
    setAuth({
      isAuthenticated: true,
      token,
      user,
    });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
