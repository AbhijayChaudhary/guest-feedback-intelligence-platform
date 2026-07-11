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

export default function DashboardPage() {
  const { token } = useAuth();
  // Configured FastAPI base URL from Next.js environment variables
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

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
      const response = await fetch(`${API_URL}/api/reviews/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to retrieve reviews');
      }
      const data = await response.json();
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
        const response = await fetch(`${API_URL}/api/reviews/search?q=${encodeURIComponent(searchQuery)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Search request failed');
        }
        const data = await response.json();
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
      const response = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      // Update the frontend lists in-place so the card is removed immediately without page reload
      setAllReviews((prev) => prev.filter((r) => r.id !== id));
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert('Failed to delete the review. Please try again.');
      console.error(err);
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
              <div className="text-center py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <p className="text-gray-500 dark:text-gray-400 font-medium">No reviews match your filters.</p>
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
