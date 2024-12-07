import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

// Create the RoleContext
export const RoleContext = createContext();

const RoleProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Example: Fetch roles from the server based on the authenticated user
    const fetchRoles = async () => {
      if (auth.isAuthenticated && auth.token) {
        try {
          const response = await fetch('/api/roles', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setRoles(data.roles);
          } else {
            console.error(data.message);
          }
        } catch (err) {
          console.error('Failed to fetch roles:', err);
        }
      }
    };

    fetchRoles();
  }, [auth]);

  const hasRole = (role) => roles.includes(role);

  return (
    <RoleContext.Provider value={{ roles, hasRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleProvider;
