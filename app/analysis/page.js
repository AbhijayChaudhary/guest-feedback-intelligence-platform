'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';

export default function CreateReviewPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  // Form states
  const [guestName, setGuestName] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [reviewText, setReviewText] = useState('');

  // Status and feedback states
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // 1. Client-side validations
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

    setSubmitting(true);

    try {
      // 2. Fetch all reviews to determine the largest existing custom ID
      const listResponse = await fetch(`${API_URL}/api/reviews/`);
      if (!listResponse.ok) {
        throw new Error('Failed to retrieve existing reviews to determine review ID.');
      }
      const reviews = await listResponse.json();

      // 3 & 4. Find the largest ID and increment by 1
      const maxId = reviews.reduce((max, r) => (r.id > max ? r.id : max), 0);
      const newId = maxId + 1;

      // 5. Generate sentiment automatically based on the rating
      const numericRating = Number(rating);
      let sentiment = 'Neutral';
      if (numericRating >= 4) {
        sentiment = 'Positive';
      } else if (numericRating <= 2) {
        sentiment = 'Negative';
      }

      // 6. Generate created_at ISO timestamp
      const createdAt = new Date().toISOString();

      // 7. Send POST request to create review
      const postBody = {
        id: newId,
        property_id: 1, // Default property ID
        guest_name: guestName.trim(),
        rating: numericRating,
        review: reviewText.trim(),
        category: category,
        sentiment: sentiment,
        created_at: createdAt
      };

      const postResponse = await fetch(`${API_URL}/api/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
      });

      if (!postResponse.ok) {
        const errorData = await postResponse.json();
        throw new Error(errorData.detail || 'Failed to submit the review.');
      }

      // SUCCESS BEHAVIOUR
      setSuccessMessage(`Success! Review #${newId} has been submitted successfully.`);
      
      // Clear all form fields
      setGuestName('');
      setRating('');
      setCategory('');
      setReviewText('');

    } catch (err) {
      // ERROR HANDLING
      setErrorMessage(err.message || 'An error occurred while submitting. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Review Analysis</h1>
          <p className="text-gray-600 dark:text-gray-400">Upload and process guest reviews to extract insights.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section: Create Review Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-100 dark:border-gray-700/50 pb-3">Submit Guest Review</h2>
              
              {/* Feedback Alerts */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-xl text-green-800 dark:text-green-400 text-sm font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-xl text-red-800 dark:text-red-400 text-sm font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Guest Name input */}
                <div>
                  <label htmlFor="guestName" className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Guest Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    disabled={submitting}
                    className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Rating Dropdown */}
                  <div>
                    <label htmlFor="rating" className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      disabled={submitting}
                      className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Select Rating</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>

                  {/* Category Dropdown */}
                  <div>
                    <label htmlFor="category" className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={submitting}
                      className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Select Category</option>
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
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="reviewText" className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Review Text <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {reviewText.length} / 1000 chars
                    </span>
                  </div>
                  <textarea
                    id="reviewText"
                    placeholder="Share the guest's feedback details..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    maxLength={1000}
                    disabled={submitting}
                    className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-36 resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="w-full py-2.5 shadow-sm active:scale-[0.98] transition-transform duration-100 font-semibold"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>

              </form>
            </div>
          </div>

          {/* Right Section: Sidebar Information Card */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-700/50 pb-2">Information</h3>
              
              <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16" />
                    </svg>
                  </div>
                  <span>Submitted reviews are stored securely in a <strong>MongoDB Atlas</strong> database collection.</span>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span>AI sentiment analysis, automated summarization, and response generation will be added in future versions.</span>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <span>The review sentiment label (Positive, Neutral, Negative) is currently generated automatically from the rating selection.</span>
                </li>
              </ul>
            </div>

            {/* Sub-Card summarizing Sentiment Mapping */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-6 transition-colors duration-300">
              <h4 className="text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">Sentiment Mapping Rules</h4>
              <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                <li>• <strong>4 or 5 Stars:</strong> Positive Sentiment</li>
                <li>• <strong>3 Stars:</strong> Neutral Sentiment</li>
                <li>• <strong>1 or 2 Stars:</strong> Negative Sentiment</li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
