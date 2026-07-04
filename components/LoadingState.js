import React from 'react';
import { Loader } from './ui';

/**
 * LoadingState Component
 * Displays a loading spinner along with a helper message.
 */
const LoadingState = ({ message = 'Loading reviews...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      <Loader size="lg" className="mb-4" />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default LoadingState;
