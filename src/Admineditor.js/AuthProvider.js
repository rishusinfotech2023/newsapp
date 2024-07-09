import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const refreshToken = async () => {
    try {
      const response = await fetch('https://news-dyf7.onrender.com/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

