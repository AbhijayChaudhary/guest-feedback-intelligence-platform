'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

/**
 * DashboardPreview Component
 * Fetches review data and renders a summary preview of the dashboard:
 * - High-level stats cards (Total, Avg Rating, Positive, Negative counts)
 * - The first three reviews as simplified compact cards
 * - A button to open the full property manager dashboard
 */
export default function DashboardPreview() {
  const { token, loading: authLoading } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Retrieve reviews from the FastAPI backend endpoint
  const fetchReviews = async () => {
    if (authLoading) return;

    // Stop loading gracefully if unauthenticated, preventing 401 calls
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await fetch(`${API_URL}/api/reviews/`, { headers });
      if (!response.ok) {
        throw new Error('Failed to retrieve reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchReviews();
    }
  }, [authLoading, token]);

  // Compute stats metrics dynamically on the client side
  const total = reviews.length;
  const averageRating = total > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1) 
    : '0.0';
  const positive = reviews.filter((r) => r.sentiment === 'Positive').length;
  const negative = reviews.filter((r) => r.sentiment === 'Negative').length;

  const stats = [
    { label: 'Total Reviews', value: total, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Average Rating', value: `${averageRating}/5`, color: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Positive Reviews', value: positive, color: 'text-green-600 dark:text-green-400' },
    { label: 'Negative Reviews', value: negative, color: 'text-red-600 dark:text-red-400' },
  ];

  const sentimentColors = {
    Positive: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Negative: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    Neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400',
  };

  return (
    <section className="py-20 bg-gray-50/50 dark:bg-gray-800/10 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Dashboard Preview</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
            See a quick overview of your guest feedback before opening the full dashboard.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 animate-spin mb-3"></div>
            <p className="text-xs text-gray-500">Loading preview data...</p>
          </div>
        ) : error ? (
          /* Error State Card with Retry Action */
          <div className="text-center py-10 bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-2xl max-w-md mx-auto">
            <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-4">Unable to load preview data.</p>
            <button
              onClick={fetchReviews}
              className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm text-center">
                  <span className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{stat.label}</span>
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* First Three Reviews Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {reviews.slice(0, 3).map((review) => {
                const formattedDate = new Date(review.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });
                const truncatedText = review.review.length > 100 
                  ? `${review.review.slice(0, 100)}...` 
                  : review.review;

                return (
                  <div key={review.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">{review.guest_name}</h4>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500">{formattedDate}</span>
                        </div>
                        <div className="flex items-center space-x-0.5">
                          <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">{review.rating}</span>
                          <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed italic mb-4">
                        "{truncatedText}"
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-700/50">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                        {review.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${sentimentColors[review.sentiment] || sentimentColors.Neutral}`}>
                        {review.sentiment}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Centered Button linking to /dashboard */}
            <div className="text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-400 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
              >
                Open Full Dashboard
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
