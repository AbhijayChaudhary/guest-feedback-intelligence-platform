'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { signIn } from 'next-auth/react';
import { loginUser } from '@/services/api';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Status and feedback states
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Validate a single field
  const validateField = (fieldName, value) => {
    let errorMsg = '';

    switch (fieldName) {
      case 'email':
        if (!value.trim()) {
          errorMsg = 'Email address is required.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = 'Please enter a valid email address.';
        }
        break;
      case 'password':
        if (!value) {
          errorMsg = 'Password is required.';
        } else if (value.length < 8) {
          errorMsg = 'Password must be at least 8 characters.';
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMsg
    }));

    return !errorMsg;
  };

  // Clear errors when the user starts typing
  const handleInputChange = (fieldName, value, setter) => {
    setter(value);
    setServerError('');
    setErrors(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  // Handle blur validation
  const handleBlur = (fieldName, value) => {
    validateField(fieldName, value);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Trigger validation for all fields
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setSubmitting(true);

    try {
      const data = await loginUser({
        email: email.trim().toLowerCase(),
        password: password,
      });

      // Success: Save details to AuthContext and localStorage
      login(data.access_token, data.user);

      // Redirect to dashboard
      router.push('/dashboard');

    } catch (err) {
      setServerError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center transition-colors duration-300">
      <div className="max-w-md w-full px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl transition-colors duration-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Log in to manage your guest feedback</p>
          </div>

          {/* Server error banner */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-xl text-red-800 dark:text-red-400 text-sm font-medium flex items-center gap-2 animate-in fade-in duration-200">
              <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. john@example.com"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value, setEmail)}
              onBlur={() => handleBlur('email', email)}
              error={errors.email}
              disabled={submitting}
              required
              autoComplete="username"
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value, setPassword)}
              onBlur={() => handleBlur('password', password)}
              error={errors.password}
              disabled={submitting}
              required
              autoComplete="current-password"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-2.5 mt-2"
              disabled={submitting}
            >
              {submitting ? 'Logging In...' : 'Log In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center justify-between">
            <span className="border-b border-gray-200 dark:border-gray-700 w-1/5"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Or continue with</span>
            <span className="border-b border-gray-200 dark:border-gray-700 w-1/5"></span>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl py-2.5 px-4 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm cursor-pointer active:scale-95 duration-100"
          >
            <svg className="w-5 h-5 mr-3 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
            <Link href="/register" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
