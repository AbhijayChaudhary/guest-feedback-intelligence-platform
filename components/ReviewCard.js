import React from 'react';
import { Button } from './ui';

/**
 * ReviewCard Component
 * Displays review details including guest name, rating, text, created date, category, sentiment, and property ID.
 * Includes a delete button to trigger the deletion confirmation dialog.
 */
const ReviewCard = ({ review, onDelete }) => {
  // Map sentiment labels to Tailwind color schemes
  const sentimentColors = {
    Positive: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Negative: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    Neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400',
  };

  // Format creation timestamp
  const formattedDate = new Date(review.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug">{review.guest_name}</h3>
            <span className="text-xs text-gray-400 dark:text-gray-500">{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{review.rating}</span>
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-4 italic">
          "{review.review}"
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {review.category}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${sentimentColors[review.sentiment] || sentimentColors.Neutral}`}>
            {review.sentiment}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Prop ID: {review.property_id ?? 1}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/50"
          onClick={() => onDelete(review.id)}
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewCard;
