'use client';

import React, { useState, useEffect } from 'react';
import { Button, Loader, Toast } from '@/components/ui';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { analyzeReview, createReview, getNextReviewId } from '@/services/api';
import AIAnalysisCard from '@/components/AIAnalysisCard';

export default function CreateReviewPage() {
  const { token } = useAuth();

  // Form states
  const [guestName, setGuestName] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [reviewText, setReviewText] = useState('');

  // Status and feedback states
  const [submitting, setSubmitting] = useState(false);

  // AI analysis and Toast states
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [toastVisible, setToastVisible] = useState(false);

  // Helper to trigger custom Toast notification
  const showToast = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  // Handle AI analysis request
  const handleAnalyzeReview = async () => {
    if (!reviewText.trim()) {
      showToast('Review text is required for AI analysis.', 'error');
      return;
    }

    setAnalyzing(true);
    setAnalysis(null);

    try {
      const data = await analyzeReview(reviewText.trim());
      setAnalysis(data);
      showToast('AI analysis completed successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Failed to analyze review. Please try again.', 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side validations
    if (!guestName.trim()) {
      showToast('Guest Name is required.', 'error');
      return;
    }
    if (!rating) {
      showToast('Please select a rating.', 'error');
      return;
    }
    if (!category) {
      showToast('Please select a category.', 'error');
      return;
    }
    if (!reviewText.trim()) {
      showToast('Review text is required.', 'error');
      return;
    }
    if (reviewText.length > 1000) {
      showToast('Review text cannot exceed 1000 characters.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      // 2. Fetch the next available review ID using getNextReviewId helper
      const newId = await getNextReviewId(token);

      // 3. Generate sentiment automatically based on the rating
      const numericRating = Number(rating);
      let sentiment = 'Neutral';
      if (numericRating >= 4) {
        sentiment = 'Positive';
      } else if (numericRating <= 2) {
        sentiment = 'Negative';
      }

      // 4. Generate created_at ISO timestamp
      const createdAt = new Date().toISOString();

      // 5. Prepare review data payload
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

      // 6. Call createReview API helper to insert the review into MongoDB
      await createReview(postBody, token);

      // SUCCESS BEHAVIOUR
      showToast(`Success! Review #${newId} has been submitted successfully.`, 'success');

      // Clear all form fields and analysis
      setGuestName('');
      setRating('');
      setCategory('');
      setReviewText('');
      setAnalysis(null);

    } catch (err) {
      // ERROR HANDLING
      showToast(err.message || 'An error occurred while submitting. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
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

                {/* Form starts here */}

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
                      onChange={(e) => {
                        setReviewText(e.target.value);
                        if (analysis) setAnalysis(null);
                      }}
                      maxLength={1000}
                      disabled={submitting}
                      className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-36 resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Analyze with AI button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAnalyzeReview}
                    disabled={analyzing || submitting}
                    className="w-full py-2.5 font-semibold flex items-center justify-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/20 cursor-pointer disabled:opacity-50"
                  >
                    {analyzing ? (
                      <>
                        <Loader size="sm" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Analyze with AI
                      </>
                    )}
                  </Button>

                  {/* AI Analysis Result Card */}
                  {analysis && (
                    <div className="mt-4 animate-in fade-in slide-in-from-bottom duration-300">
                      <AIAnalysisCard analysis={analysis} />
                    </div>
                  )}

                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting || analyzing}
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
                    <span>Analyze reviews in real-time with <strong>AI Analysis</strong> to detect sentiment, extract key themes, summarize content, and get suggested responses.</span>
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
              {/* Sub-Card summarizing AI Features */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-6 transition-colors duration-300">
                <h4 className="text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">AI Features</h4>
                <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1.5 font-medium">
                  <li>✓ Sentiment Detection</li>
                  <li>✓ Theme Extraction</li>
                  <li>✓ Review Summary</li>
                  <li>✓ Suggested Response</li>
                  <li>✓ Sarcasm Detection</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Reusable Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </ProtectedRoute>
  );
}
