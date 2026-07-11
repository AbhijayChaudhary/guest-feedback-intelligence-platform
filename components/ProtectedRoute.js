'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/ui';

/**
 * ProtectedRoute component for GuestBook.
 * Wraps pages that require the user to be authenticated.
 * 
 * - Shows a full-page loading spinner while restoring the session.
 * - Redirects to /login if the session check finishes and the user is not logged in.
 * - Renders children (page content) only if the user is authenticated.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if the auth state has finished loading and user is not authenticated
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Show centered loader while authentication is loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Loader size="lg" />
      </div>
    );
  }

  // Prevent rendering of children (protected content) if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return children;
}
