'use client';

import React, { useEffect } from 'react';

/**
 * Reusable Toast notification component for the GuestBook UI library.
 * 
 * @param {Object} props
 * @param {string} props.message - The message text to display.
 * @param {'success' | 'error' | 'info'} [props.type='info'] - The type of notification.
 * @param {boolean} props.isVisible - Whether the toast is currently visible.
 * @param {function} props.onClose - Function to call when the toast should be dismissed.
 * @param {number} [props.duration=3000] - Duration in milliseconds before auto-closing.
 */
const Toast = ({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
    error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
    info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300'
  };

  const icons = {
    success: (
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div className="fixed bottom-4 right-4 z-[110] animate-in slide-in-from-right-full fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 border rounded-xl shadow-lg ${typeStyles[type]}`}>
        <div className="shrink-0">
          {icons[type]}
        </div>
        <p className="text-sm font-medium pr-4">
          {message}
        </p>
        <button 
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors opacity-60 hover:opacity-100"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
