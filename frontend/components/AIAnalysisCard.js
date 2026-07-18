import React from 'react';

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
  // If no analysis data is provided, stop loading gracefully and return null
  if (!analysis) return null;

  // Map sentiment labels to responsive Tailwind color schemes matching the project dashboard design language
  const sentimentColors = {
    Positive: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Neutral: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Negative: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 w-full">

      {/* Card Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">AI Review Analysis</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Real-time insights generated from the guest's feedback</p>
        </div>

        {/* Sentiment Badge */}
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${sentimentColors[analysis.sentiment] || sentimentColors.Neutral}`}>
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse"></span>
            {analysis.sentiment || 'Neutral'}
          </span>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="space-y-5">

        {/* Themes Badges Row */}
        {analysis.themes && analysis.themes.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Key Themes</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.themes.map((theme, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Summary Section */}
        {analysis.summary && (
          <div>
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Review Summary</h4>
            <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-700/60 rounded-xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                {analysis.summary}
              </p>
            </div>
          </div>
        )}

        {/* AI Suggested Response Section */}
        {analysis.response_suggestion && (
          <div>
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Suggested Response</h4>
            <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/30 dark:border-blue-900/20 rounded-xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal italic">
                "{analysis.response_suggestion}"
              </p>
            </div>
          </div>
        )}

        {/* Sarcasm Detection Badge Row */}
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Sarcasm</span>
          {analysis.sarcasm_detected ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
              <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Detected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400">
              <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Not Detected
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default AIAnalysisCard;
