'use client';

import React, { useEffect, useCallback, useRef } from 'react';

/**
 * Reusable Modal component for the GuestBook UI library.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is currently visible.
 * @param {function} props.onClose - Function to call when the modal should be closed.
 * @param {string} [props.title] - Optional title for the modal header.
 * @param {React.ReactNode} props.children - Content to be displayed inside the modal.
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  const closeButtonRef = useRef(null);

  // Handle escape key press
  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Basic keyboard accessibility: focus the close button when opened
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            {title && (
              <h3 id="modal-title" className="text-lg font-bold text-gray-900 leading-none">
                {title}
              </h3>
            )}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-1 px-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-100 outline-none"
              aria-label="Close modal"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
