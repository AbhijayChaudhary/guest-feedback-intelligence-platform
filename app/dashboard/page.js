export default function DashboardPage() {
  const stats = [
    { label: 'Total Reviews', value: '1,250', change: '+12% from last month', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' },
    { label: 'Positive Reviews', value: '82%', change: '+5% improvement', icon: 'M14 10h4.757c1.27 0 2.539.6 3.018 1.613l2.225 4.896A1 1 0 0123.018 18h-11.02m-4.509-3L5.682 9.5a1 1 0 011.812-.853l1.833 3.667' },
    { label: 'Average Rating', value: '4.5/5', change: 'Stable', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { label: 'Pending Responses', value: '12', change: 'Action Required', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  ];

  const themes = [
    { name: 'Cleanliness', score: 94, color: 'text-green-600 bg-green-50' },
    { name: 'Staff Behaviour', score: 88, color: 'text-blue-600 bg-blue-50' },
    { name: 'Food Quality', score: 76, color: 'text-yellow-600 bg-yellow-50' },
    { name: 'Location', score: 92, color: 'text-indigo-600 bg-indigo-50' },
    { name: 'Check-in Experience', score: 65, color: 'text-red-600 bg-red-50' },
  ];

  const insights = [
    { text: 'Guests frequently praise room cleanliness.', type: 'positive' },
    { text: 'Check-in delays are mentioned in several recent reviews.', type: 'negative' },
    { text: 'Staff friendliness is a recurring positive theme.', type: 'positive' },
  ];

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen font-geist-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance Dashboard</h1>
            <p className="text-gray-600">Track key guest satisfaction metrics over time.</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-xs font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors">Last 30 Days</button>
            <button className="px-3 py-1.5 bg-blue-600 border border-blue-700 text-xs font-medium rounded-md text-white hover:bg-blue-700 transition-colors">Export Report</button>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className={`text-[10px] mt-1 font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-gray-400'}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sentiment Trend */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-gray-900">Sentiment Trend</h2>
                <div className="flex space-x-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-600 rounded-full"></div> Positive</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-gray-200 rounded-full"></div> Negative</div>
                </div>
              </div>
              <div className="h-48 flex items-end gap-3 px-2">
                {[60, 45, 75, 40, 90, 65, 80, 55, 70, 85, 40, 75].map((h, i) => (
                  <div key={i} className="flex-grow flex flex-col gap-1 items-center group">
                    <div className="w-full bg-blue-600 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                    <div className="w-full bg-gray-100 rounded-sm" style={{ height: `${20}%` }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-medium px-1 uppercase letter-tight">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>

            {/* Recent AI Insights */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900 mb-6">Recent AI Insights</h2>
              <div className="space-y-4">
                {insights.map((insight, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${insight.type === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {insight.type === 'positive' ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Mentioned Themes */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
            <h2 className="text-sm font-semibold text-gray-900 mb-6">Top Mentioned Themes</h2>
            <div className="space-y-6">
              {themes.map((theme, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700">{theme.name}</span>
                    <span className="text-gray-500 font-medium">{theme.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${theme.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-8 border-t border-gray-100 italic text-[11px] text-gray-400">
              * Themes are automatically extracted using NLP model v2.1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
