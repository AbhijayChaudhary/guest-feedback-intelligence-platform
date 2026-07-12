'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [googleLoggingIn, setGoogleLoggingIn] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    // Initial check on mount to restore user session
    try {
      const savedToken = localStorage.getItem('guestbook_token');
      const savedUser = localStorage.getItem('guestbook_user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading auth session from localStorage:', error);
      // Clear potentially corrupted storage
      localStorage.removeItem('guestbook_token');
      localStorage.removeItem('guestbook_user');
    } finally {
      setLocalLoading(false);
    }
  }, []);

  // Synchronize Google OAuth session with our FastAPI backend
  useEffect(() => {
    // If NextAuth has authenticated with Google, but we don't have our custom JWT token yet
    if (status === 'authenticated' && session?.user && !token && !googleLoggingIn) {
      async function syncGoogleUser() {
        setGoogleLoggingIn(true);
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
          const response = await fetch(`${API_URL}/api/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: session.user.name || 'Google User',
              email: session.user.email,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            login(data.access_token, data.user);
          } else {
            console.error('Failed to sync Google user with backend:', response.status);
          }
        } catch (error) {
          console.error('Error syncing Google user with backend:', error);
        } finally {
          setGoogleLoggingIn(false);
        }
      }
      syncGoogleUser();
    }
  }, [session, status, token, googleLoggingIn]);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('guestbook_token', newToken);
    localStorage.setItem('guestbook_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('guestbook_token');
    localStorage.removeItem('guestbook_user');
    // Sign out from NextAuth as well to keep sessions aligned
    signOut({ redirect: false });
  };

  const isAuthenticated = !!token;
  
  // Combine local state loading, next-auth state loading, and token exchange progress
  const loading = localLoading || status === 'loading' || googleLoggingIn;

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};