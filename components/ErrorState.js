import React from 'react';
import { Button } from './ui';

/**
 * ErrorState Component
 * Displays a friendly error notice for network/API failures with a retry button to run the fetch again.
 */
const ErrorState = ({ message = 'Unable to load reviews.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-red-50/50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/50 rounded-xl shadow-sm">
      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Error</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Retry Connection
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
