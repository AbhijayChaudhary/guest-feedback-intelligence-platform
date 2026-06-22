'use client';

import { Button } from '@/components/ui';

export default function AnalysisPage() {
  return (
    <div className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Review Analysis</h1>
          <p className="text-gray-600 dark:text-gray-400">Upload and process guest reviews to extract insights.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
              <h2 className="text-lg font-semibold dark:text-gray-100 mb-4">Upload Reviews</h2>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">CSV or TXT files only (Max. 10MB)</p>
                <Button variant="primary" className="mt-4">
                  Select Files
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
              <h2 className="text-lg font-semibold dark:text-gray-100 mb-4">Recent Processing</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">File Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">No reviews processed yet</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
              <h3 className="text-base font-semibold dark:text-gray-100 mb-3">Analysis Options</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded" defaultChecked />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Sentiment Analysis</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded" defaultChecked />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Theme Extraction</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 rounded" />
                  <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Competitor Benchmarking</label>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl p-6 transition-colors duration-300">
              <h3 className="text-blue-800 dark:text-blue-300 text-sm font-semibold mb-2">Project Goal</h3>
              <p className="text-blue-700 dark:text-blue-400 text-xs leading-relaxed">
                This module will eventually use Natural Language Processing to categorize reviews and generate automated summaries for operators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
