import React from 'react';

/**
 * ReviewFilters Component
 * Provides input fields and select dropdowns to search and filter reviews dynamically.
 * Includes a Clear Filters button to reset all filter parameters.
 */
const ReviewFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSentiment,
  onSentimentChange,
  selectedRating,
  onRatingChange,
  onClearFilters,
  categories = [],
  sentiments = ['Positive', 'Negative', 'Neutral'],
  ratings = [5, 4, 3, 2, 1]
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Search Reviews</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or text..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-sm pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-700 bg-transparent dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sentiment Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Sentiment</label>
          <select
            value={selectedSentiment}
            onChange={(e) => onSentimentChange(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
          >
            <option value="">All Sentiments</option>
            {sentiments.map((sent, i) => (
              <option key={i} value={sent}>{sent}</option>
            ))}
          </select>
        </div>

        {/* Rating Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Rating</label>
          <select
            value={selectedRating}
            onChange={(e) => onRatingChange(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
          >
            <option value="">All Ratings</option>
            {ratings.map((rate) => (
              <option key={rate} value={rate}>{rate} Star{rate > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <div>
          <label className="block text-[11px] font-bold text-transparent mb-1.5 uppercase select-none">Clear</label>
          <button
            type="button"
            onClick={onClearFilters}
            className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-center"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;
