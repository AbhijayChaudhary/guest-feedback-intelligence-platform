'use client';

import React, { useState, useEffect } from 'react';
import DashboardStats from '@/components/DashboardStats';
import ReviewFilters from '@/components/ReviewFilters';
import ReviewCard from '@/components/ReviewCard';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import EditReviewModal from '@/components/EditReviewModal';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { getReviews, searchReviews, deleteReview } from '@/services/api';

export default function DashboardPage() {
  const { token } = useAuth();

  // State management
  const [allReviews, setAllReviews] = useState([]); // Master list for top-level stats and category calculation
  const [reviews, setReviews] = useState([]); // Current working list (updated by the search API)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  // Edit Modal state management
  const [selectedReview, setSelectedReview] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch all reviews once when the page loads to initialize stats and base list
  const fetchAllReviews = async () => {
    if (!token) return;
    setLoading(true);
    setError(false);
    try {
      const data = await getReviews(token);

      setAllReviews(data);
      setReviews(data);
    } catch (err) {
      console.error(err);
      setReviews([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllReviews();
    }
  }, [token]);

  // Debounced Search API call: hits /api/reviews/search?q= when searchQuery is typed
  useEffect(() => {
    // Skip calling search API if query is empty, simply reset to the full list
    if (!searchQuery.trim()) {
      setReviews(allReviews);
      setError(false);
      return;
    }

    const searchDebounce = setTimeout(async () => {
      if (!token) return;
      setLoading(true);
      setError(false);
      try {
        const data = await searchReviews(searchQuery, token);
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 450); // 450ms debounce helps prevent unnecessary API hits as the user types

    return () => clearTimeout(searchDebounce);
  }, [searchQuery, allReviews, token]);

  // Handle deleting a review
  const handleDeleteReview = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this review?');
    if (!isConfirmed) return;

    try {
      await deleteReview(id, token);

      // Update the frontend lists in-place so the card is removed immediately without page reload
      setAllReviews((prev) => prev.filter((r) => r.id !== id));
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete the review. Please try again.');
    }
  };

  // Reset all filters and search parameters back to their defaults
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSentiment('');
    setSelectedRating('');
    setReviews(allReviews);
  };

  // Handle opening the Edit Review Modal
  const handleEditClick = (review) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  // Handle updating lists locally after successful PUT request
  const handleReviewUpdate = (updatedReview) => {
    setAllReviews((prev) => prev.map((r) => r.id === updatedReview.id ? updatedReview : r));
    setReviews((prev) => prev.map((r) => r.id === updatedReview.id ? updatedReview : r));
  };


  // Derive unique categories dynamically from the loaded master list of reviews
  const categories = [...new Set(allReviews.map((r) => r.category))].filter(Boolean);

  // Apply dropdown filters (Category, Sentiment, Rating) locally on the current search results
  const filteredReviews = reviews.filter((review) => {
    const matchesCategory = !selectedCategory || review.category === selectedCategory;
    const matchesSentiment = !selectedSentiment || review.sentiment === selectedSentiment;
    const matchesRating = !selectedRating || String(review.rating) === String(selectedRating);
    return matchesCategory && matchesSentiment && matchesRating;
  });

  // Calculate statistics from the complete reviews dataset
  const total = allReviews.length;
  const averageRating = total > 0
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
    : '0.0';
  const positive = allReviews.filter((r) => r.sentiment === 'Positive').length;
  const negative = allReviews.filter((r) => r.sentiment === 'Negative').length;
  const stats = { total, averageRating, positive, negative };

  return (
    <ProtectedRoute>
      <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Property Manager Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage customer reviews across your properties.</p>
            {allReviews.length > 0 && (
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-2">
                Showing {filteredReviews.length} of {allReviews.length} reviews
              </p>
            )}
          </div>

          {/* Loading and Error States for Stats / Top Area */}
          {loading && allReviews.length === 0 ? (
            <LoadingState message="Loading dashboard statistics..." />
          ) : error && allReviews.length === 0 ? (
            <ErrorState message="Unable to load reviews from the server." onRetry={fetchAllReviews} />
          ) : allReviews.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm max-w-md mx-auto p-8 flex flex-col items-center justify-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No reviews yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                Create your first guest review to start tracking customer feedback.
              </p>
            </div>
          ) : (
            <>
              {/* Statistics Row */}
              <DashboardStats stats={stats} />

              {/* Filter controls */}
              <ReviewFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedSentiment={selectedSentiment}
                onSentimentChange={setSelectedSentiment}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                onClearFilters={handleClearFilters}
                categories={categories}
              />

              {/* Main Content (Review Cards) */}
              {error ? (
                <ErrorState message="Unable to load reviews." onRetry={fetchAllReviews} />
              ) : loading && reviews.length === 0 ? (
                <LoadingState message="Searching reviews..." />
              ) : filteredReviews.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm max-w-md mx-auto p-8 flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center mb-4 text-gray-400 dark:text-gray-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <p className="text-gray-900 dark:text-gray-100 font-bold mb-1">No reviews match your filters</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">Try adjusting your filters or clearing the search query.</p>
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline cursor-pointer"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      onDelete={handleDeleteReview}
                      onEdit={handleEditClick}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Modal form for editing reviews */}
          <EditReviewModal
            review={selectedReview}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={handleReviewUpdate}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
