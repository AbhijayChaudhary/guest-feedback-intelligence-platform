'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button } from '@/components/ui';

export default function RegisterPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const router = useRouter();

  // Form field states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');

  // Status and feedback states
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');

  // Validate a single field
  const validateField = (fieldName, value) => {
    let errorMsg = '';

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          errorMsg = 'Full Name is required.';
        } else if (value.trim().length < 2) {
          errorMsg = 'Name must be at least 2 characters.';
        } else if (value.trim().length > 50) {
          errorMsg = 'Name cannot exceed 50 characters.';
        }
        break;
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
        } else if (value.length > 64) {
          errorMsg = 'Password cannot exceed 64 characters.';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errorMsg = 'Please confirm your password.';
        } else if (value !== password) {
          errorMsg = 'Passwords do not match.';
        }
        break;
      case 'role':
        if (!value || (value !== 'customer' && value !== 'manager')) {
          errorMsg = 'Please select a valid role.';
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
    setSuccessMessage('');

    // Trigger validation for all fields
    const isNameValid = validateField('name', name);
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);
    const isConfirmPasswordValid = validateField('confirmPassword', confirmPassword);
    const isRoleValid = validateField('role', role);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isRoleValid) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password,
          role: role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errMsg = 'Registration failed. Please try again.';
        if (data && data.detail) {
          if (typeof data.detail === 'string') {
            errMsg = data.detail;
          } else if (Array.isArray(data.detail)) {
            errMsg = data.detail.map(err => err.msg).join(', ');
          }
        }
        throw new Error(errMsg);
      }

      // Success
      setSuccessMessage('Registration successful! Redirecting to login page...');

      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('customer');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      setServerError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center transition-colors duration-300">
      <div className="max-w-md w-full px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl transition-colors duration-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create Account</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Join GuestBook to start analyzing guest feedback</p>
          </div>

          {/* Success message banner */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-xl text-green-800 dark:text-green-400 text-sm font-medium flex items-center gap-2">
              <svg className="w-5 h-5 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Server error message banner */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-xl text-red-800 dark:text-red-400 text-sm font-medium flex items-center gap-2">
              <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => handleInputChange('name', e.target.value, setName)}
              onBlur={() => handleBlur('name', name)}
              error={errors.name}
              disabled={submitting}
              required
              autoComplete="name"
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. jane@example.com"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value, setEmail)}
              onBlur={() => handleBlur('email', email)}
              error={errors.email}
              disabled={submitting}
              required
              autoComplete="username"
            />

            {/* Role selection */}
            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => handleInputChange('role', e.target.value, setRole)}
                onBlur={() => handleBlur('role', role)}
                disabled={submitting}
                className="px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-900 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer disabled:opacity-50"
              >
                <option value="customer">Customer</option>
                <option value="manager">Property Manager</option>
              </select>
              {errors.role && (
                <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-0.5">
                  {errors.role}
                </p>
              )}
            </div>

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value, setPassword)}
              onBlur={() => handleBlur('password', password)}
              error={errors.password}
              disabled={submitting}
              required
              autoComplete="new-password"
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value, setConfirmPassword)}
              onBlur={() => handleBlur('confirmPassword', confirmPassword)}
              error={errors.confirmPassword}
              disabled={submitting}
              required
              autoComplete="new-password"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center py-2.5 mt-2"
              disabled={submitting}
            >
              {submitting ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
            <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
