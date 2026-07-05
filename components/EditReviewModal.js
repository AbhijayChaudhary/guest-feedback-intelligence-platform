'use client';

import React, { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import { Button } from './ui';

/**
 * EditReviewModal Component
 * Centered modal containing an form pre-filled with the selected review.
 * Allows editing Guest Name, Rating, Category, and Review Text.
 * Validates inputs, handles PUT requests to the backend, and invokes onUpdate callback.
 */
export default function EditReviewModal({ review, isOpen, onClose, onUpdate }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  // Form states
  const [guestName, setGuestName] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [reviewText, setReviewText] = useState('');

  // Status and feedback states
  const [updating, setUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync state with review whenever the modal opens or review reference changes
  useEffect(() => {
    if (isOpen && review) {
      setGuestName(review.guest_name || '');
      setRating(String(review.rating || ''));
      setCategory(review.category || '');
      setReviewText(review.review || '');
      setErrorMessage('');
    }
  }, [isOpen, review]);

  if (!isOpen || !review) return null;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!guestName.trim()) {
      setErrorMessage('Guest Name is required.');
      return;
    }
    if (!rating) {
      setErrorMessage('Please select a rating.');
      return;
    }
    if (!category) {
      setErrorMessage('Please select a category.');
      return;
    }
    if (!reviewText.trim()) {
      setErrorMessage('Review text is required.');
      return;
    }
    if (reviewText.length > 1000) {
      setErrorMessage('Review text cannot exceed 1000 characters.');
      return;
    }

    setUpdating(true);

    try {
      // Auto-generate sentiment based on rating selection
      const numericRating = Number(rating);
      let sentiment = 'Neutral';
      if (numericRating >= 4) {
        sentiment = 'Positive';
      } else if (numericRating <= 2) {
        sentiment = 'Negative';
      }

      // Prepare payload maintaining original read-only values
      const putBody = {
        id: review.id,
        property_id: review.property_id || 1,
        guest_name: guestName.trim(),
        rating: numericRating,
        review: reviewText.trim(),
        category: category,
        sentiment: sentiment,
        created_at: review.created_at
      };

      const response = await fetch(`${API_URL}/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update the review.');
      }

      const updatedReview = await response.json();
      
      // Update state in page.js
      onUpdate(updatedReview);
      
      // Dismiss the modal
      onClose();

    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while updating. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Review">
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-xl text-red-800 dark:text-red-400 text-xs font-medium flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Guest Name Input */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
            Guest Name
          </label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            disabled={updating}
            className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Rating Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              disabled={updating}
              className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer disabled:opacity-50"
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={updating}
              className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer disabled:opacity-50"
            >
              <option value="Cleanliness">Cleanliness</option>
              <option value="Staff">Staff</option>
              <option value="Location">Location</option>
              <option value="Food">Food</option>
              <option value="Wi-Fi">Wi-Fi</option>
              <option value="Amenities">Amenities</option>
              <option value="Value for Money">Value for Money</option>
              <option value="Overall Experience">Overall Experience</option>
            </select>
          </div>
        </div>

        {/* Review Textarea */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Review Text
            </label>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              {reviewText.length} / 1000 chars
            </span>
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={1000}
            disabled={updating}
            className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-32 resize-none disabled:opacity-50"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={updating}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
