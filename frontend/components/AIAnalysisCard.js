import React, { useState } from 'react';

/**
 * AIAnalysisCard Component
 * 
 * Displays rich, structured AI feedback returned from the backend after analyzing a guest review.
 * Features sentiment badges, dynamic theme pills, sarcasm status indicators, and summary / response card modules.
 * 
 * @param {Object} props
 * @param {Object} props.analysis - The AI analysis object containing sentiment, themes, summary, response_suggestion, and sarcasm_detected
 */
const AIAnalysisCard = ({ analysis }) => {
  const [copied, setCopied] = useState(false);

  // If no analysis data is provided, stop loading gracefully and return null
  if (!analysis) return null;

  // Map sentiment labels to responsive Tailwind color schemes matching the project dashboard design language
  const sentimentColors = {
    Positive: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30',
    Neutral: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-900/30',
    Negative: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
  };

  const handleCopy = async () => {
    if (!analysis.response_suggestion) return;
    try {
      await navigator.clipboard.writeText(analysis.response_suggestion);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy suggested response to clipboard:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 w-full">

      {/* Card Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H14l.82-5.109L6 15.904h3.813z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-50 leading-tight">AI Review Analysis</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Real-time insights generated from the guest's feedback</p>
          </div>
        </div>

        {/* Sentiment Badge */}
        <div className="self-start sm:self-auto">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${sentimentColors[analysis.sentiment] || sentimentColors.Neutral}`}>
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"></span>
            {analysis.sentiment || 'Neutral'}
          </span>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="space-y-6">

        {/* Themes Badges Row */}
        {analysis.themes && analysis.themes.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider">
              <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-505" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Key Themes</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {analysis.themes.map((theme, index) => (
                <span
                  key={index}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50/50 text-blue-700 dark:bg-blue-900/10 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/20"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Summary Section */}
        {analysis.summary && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider">
              <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-505" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Review Summary</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/25 border border-gray-100 dark:border-gray-700/60 rounded-xl p-4">
              <p className="text-sm text-gray-750 dark:text-gray-300 leading-relaxed font-normal">
                {analysis.summary}
              </p>
            </div>
          </div>
        )}

        {/* AI Suggested Response Section */}
        {analysis.response_suggestion && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-505" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Suggested Response</span>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 border border-transparent hover:border-blue-200 dark:hover:border-blue-900/30 transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-600 dark:text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy Response</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative bg-blue-50/20 dark:bg-blue-950/5 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-xl p-4 shadow-sm">
              <span className="absolute top-2 left-2 text-3xl text-blue-300 dark:text-blue-900/40 leading-none select-none font-serif">“</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal pl-4 italic">
                {analysis.response_suggestion}
              </p>
            </div>
          </div>
        )}

        {/* Sarcasm Detection Badge Row */}
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400 dark:text-gray-505" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-gray-650 dark:text-gray-400">Sarcasm Detection</span>
          </div>
          {analysis.sarcasm_detected ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Yes, Detected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400 border border-gray-200/30">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              No
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default AIAnalysisCard;
