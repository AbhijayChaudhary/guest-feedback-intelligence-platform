export default function DashboardPage() {
  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance Dashboard</h1>
            <p className="text-gray-600">Track key guest satisfaction metrics over time.</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-xs font-medium rounded-md text-gray-700 hover:bg-gray-50">Last 30 Days</button>
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-xs font-medium rounded-md text-gray-700 hover:bg-gray-50">Export Report</button>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Reviews', value: '0', change: '0%' },
            { label: 'Avg. Sentiment', value: 'N/A', change: '0%' },
            { label: 'Response Rate', value: '0%', change: '0%' },
            { label: 'Pending Action', value: '0', change: '-' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs text-gray-400">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
            <h2 className="text-sm font-semibold text-gray-900 mb-6">Sentiment Over Time</h2>
            <div className="flex-grow bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-400">Trend data will appear here after processing reviews</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
            <h2 className="text-sm font-semibold text-gray-900 mb-6">Top Mentioned Themes</h2>
            <div className="flex-grow bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-sm text-gray-400">Theme categories will appear here after analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
