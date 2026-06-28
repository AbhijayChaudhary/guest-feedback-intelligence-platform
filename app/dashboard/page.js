'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui';

export default function DashboardPage() {
  // Holds the computed statistics derived from backend review data
  const [stats, setStats] = useState(null);

  // Loading and error states for the fetch
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch all reviews once on mount and compute sentiment counts
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/reviews');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const reviews = await response.json();

        // Count each sentiment type (case-insensitive)
        const positive = reviews.filter(
          (r) => r.sentiment?.toLowerCase() === 'positive'
        ).length;
        const negative = reviews.filter(
          (r) => r.sentiment?.toLowerCase() === 'negative'
        ).length;
        const neutral = reviews.filter(
          (r) => r.sentiment?.toLowerCase() === 'neutral'
        ).length;

        // Count reviews per category and sort by count descending
        const categoryCounts = {};
        reviews.forEach((r) => {
          if (r.category) {
            categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
          }
        });

        // Convert to a sorted array: [{ name, count }, ...]
        const themes = Object.entries(categoryCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        setStats({
          total: reviews.length,
          positive,
          negative,
          neutral,
          themes,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Stat card definitions — icons are the same SVG paths as before
  const statCards = stats
    ? [
        {
          label: 'Total Reviews',
          value: stats.total,
          change: 'From backend',
          icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2',
        },
        {
          label: 'Positive Reviews',
          value: stats.positive,
          change: '+Positive sentiment',
          icon: 'M14 10h4.757c1.27 0 2.539.6 3.018 1.613l2.225 4.896A1 1 0 0123.018 18h-11.02m-4.509-3L5.682 9.5a1 1 0 011.812-.853l1.833 3.667',
        },
        {
          label: 'Negative Reviews',
          value: stats.negative,
          change: 'Negative sentiment',
          icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        },
        {
          label: 'Neutral Reviews',
          value: stats.neutral,
          change: 'Neutral sentiment',
          icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
        },
      ]
    : [];

  // Derive theme list from fetched data; empty array until data arrives
  const themes = stats?.themes ?? [];

  // The highest category count is used as the 100% baseline for progress bars
  const maxThemeCount = themes.length > 0 ? themes[0].count : 1;

  const insights = [
    { text: 'Guests frequently praise room cleanliness.', type: 'positive' },
    { text: 'Check-in delays are mentioned in several recent reviews.', type: 'negative' },
    { text: 'Staff friendliness is a recurring positive theme.', type: 'positive' },
  ];

  return (
    <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen font-geist-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Performance Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Track key guest satisfaction metrics over time.</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm">Last 30 Days</Button>
            <Button variant="primary" size="sm">Export Report</Button>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Show loading message while the API call is in-flight */}
          {loading && (
            <p className="col-span-4 text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              Loading dashboard...
            </p>
          )}

          {/* Show error message if the API request failed */}
          {!loading && error && (
            <p className="col-span-4 text-sm text-red-500 text-center py-4">
              Failed to load dashboard data.
            </p>
          )}

          {/* Render stat cards once data is available */}
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</span>
              </div>
              <p className={`text-[10px] mt-1 font-medium ${stat.change.includes('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sentiment Trend */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Sentiment Trend</h2>
                <div className="flex space-x-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-600 rounded-full"></div> Positive</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div> Negative</div>
                </div>
              </div>
              <div className="h-48 flex items-end gap-3 px-2">
                {[60, 45, 75, 40, 90, 65, 80, 55, 70, 85, 40, 75].map((h, i) => (
                  <div key={i} className="flex-grow flex flex-col gap-1 items-center group">
                    <div className="w-full bg-blue-600 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-sm" style={{ height: `${20}%` }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-gray-400 dark:text-gray-500 font-medium px-1 uppercase letter-tight">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>

            {/* Recent AI Insights */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent AI Insights</h2>
              <div className="space-y-4">
                {insights.map((insight, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${insight.type === 'positive' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
                      {insight.type === 'positive' ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Mentioned Themes */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm flex flex-col transition-colors duration-300">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-6">Top Mentioned Themes</h2>
            <div className="space-y-6">
              {loading && (
                <p className="text-xs text-gray-400 dark:text-gray-500">Loading themes...</p>
              )}
              {themes.map((theme, i) => {
                // Bar width is proportional to the most-frequent category (= 100%)
                const barWidth = Math.round((theme.count / maxThemeCount) * 100);
                const label = theme.count === 1 ? '1 Review' : `${theme.count} Reviews`;
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{theme.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${barWidth}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-700 italic text-[11px] text-gray-400 dark:text-gray-500">
              * Categories are counted directly from backend review data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
