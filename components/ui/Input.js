'use client';

import React from 'react';

/**
 * Input component for the GuestBook UI library.
 * 
 * @param {Object} props
 * @param {string} props.label - Label text for the input.
 * @param {string} [props.placeholder=''] - Placeholder text.
 * @param {string} [props.type='text'] - HTML input type.
 * @param {string | number} [props.value] - Current value of the input.
 * @param {function} [props.onChange] - Change event handler.
 * @param {string} [props.error=''] - Error message to display.
 * @param {string} [props.id] - Unique identifier for the input and label.
 * @param {string} [props.className=''] - Additional CSS classes.
 */
const Input = ({
  label,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  error = '',
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none"
        >
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
          error
            ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30'
            : 'border-gray-300 dark:border-gray-700 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-600'
        }`}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
