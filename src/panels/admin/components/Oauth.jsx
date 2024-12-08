import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const errorParam = urlParams.get('error');

    if (errorParam) {
      setError(errorParam);
      return;
    }

    if (token) {
      try {
        localStorage.setItem('token', token);
        navigate("/admin");
      } catch (storageError) {
        setError('Failed to store authentication token');
        console.error(storageError);
      }
    } else {
      // If no token is present, redirect back to login
      navigate("/login");
    }
  }, [navigate]);

  if (error) {
    return (
      <div>
        <h2>Authentication Error</h2>
        <p>{
          error === 'authentication_failed' 
            ? 'Google authentication failed. Please try again.' 
            : 'An unexpected error occurred during login.'
        }</p>
        <button onClick={() => navigate('/login')}>Return to Login</button>
      </div>
    );
  }

  return <div>Processing login...</div>;
};

export default OAuthCallback;