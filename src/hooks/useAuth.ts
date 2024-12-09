import { useState, useEffect } from 'react';

interface User {
  name: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    setUser({
      name: 'Arfeen Awan',
      role: 'Instructor'
    });
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user
  };
};