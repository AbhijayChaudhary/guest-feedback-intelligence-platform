export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-100 pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              Prototype v1.0
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight font-geist-sans">
              Transform Guest Reviews <br />
              Into Actionable <span className="text-blue-600">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Analyze guest feedback, discover recurring issues, and improve customer satisfaction using our intelligent analysis platform.
            </p>
            <div className="flex pt-4">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95">
                Get Started
              </button>
            </div>
          </div>
          
          <div className="relative">
            {/* Review Intelligence Preview Card */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 lg:p-8 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Overall Sentiment</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-3xl font-bold text-gray-900">82%</span>
                    <span className="ml-2 text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">+4.2%</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-lg font-bold text-gray-900">1,284</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <p className="text-xs text-green-700/70 mb-1">Pos</p>
                  <p className="text-lg font-bold text-green-700">1,052</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-xl">
                  <p className="text-xs text-red-700/70 mb-1">Neg</p>
                  <p className="text-lg font-bold text-red-700">84</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-400 uppercase">Top Themes</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">Cleanliness</span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100">Staff Behavior</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-100">Location</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Example Snippet</span>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "The apartment was spotless and the host was extremely helpful with local recommendations. Truly a 5-star experience..."
                </p>
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
