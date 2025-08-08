// src/components/authContext/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Versuche, den Token aus localStorage zu laden
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Optional: Hier könnte man den Token decodieren und Userdaten setzen
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
