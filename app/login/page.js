'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const router = useRouter();
  const { login } = useAuth();

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
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errMsg = 'Invalid email or password.';
        if (data && data.detail) {
          if (typeof data.detail === 'string') {
            errMsg = data.detail;
          } else if (Array.isArray(data.detail)) {
            errMsg = data.detail.map(err => err.msg).join(', ');
          }
        }
        throw new Error(errMsg);
      }

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
