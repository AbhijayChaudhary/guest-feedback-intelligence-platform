import React from 'react';

/**
 * Reusable Loader (spinner) component for the GuestBook UI library.
 * 
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the spinner.
 * @param {string} [props.className=''] - Additional CSS classes for the container.
 */
const Loader = ({ size = 'md', className = '' }) => {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`rounded-full border-gray-200 border-t-blue-600 animate-spin ${sizeStyles[size]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
