export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-100 pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 font-geist-sans">
              Transform Guest Reviews <br />
              Into Actionable Insights
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              Analyze guest feedback, discover recurring issues, and improve customer satisfaction using our intelligent analysis platform.
            </p>
            <div className="flex">
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                Get Started
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="w-full h-96 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center p-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor font-light">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
