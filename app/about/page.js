export default function AboutPage() {
  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About the Project</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6 italic border-l-4 border-blue-600 pl-4 bg-blue-50 py-2 rounded-r">
              "GuestBook is an AI-powered Guest Feedback Intelligence Platform designed for homestay and hospitality businesses."
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Core Objective</h2>
            <p className="text-gray-600 mb-6">
              The objective of this platform is to help business owners understand their customers better by automating the analysis of thousands of guest reviews. By extracting sentiment and identifying recurring themes, operators can prioritize improvements and respond more effectively to feedback.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Planned Features</h2>
            <ul className="list-disc pl-5 space-y-3 text-gray-600">
              <li><strong>Natural Language Processing:</strong> Using transformer models to detect emotion and intent in text.</li>
              <li><strong>Automated Tagging:</strong> Categorizing reviews into business domains like Cleanliness, Amenities, and Staff.</li>
              <li><strong>Response Engine:</strong> Providing template suggestions based on specific guest complaints or praises.</li>
              <li><strong>Trend Analytics:</strong> Visualizing how guest satisfaction evolves over weeks and months.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Internship Context</h2>
            <p className="text-gray-600 mb-10">
              This prototype is developed as part of an internship project exploring the intersection of AI and Hospitality. The focus is on usability and providing real value to homestay operators who might not have time to manually sort through hundreds of reviews.
            </p>

            <div className="border-t border-gray-100 pt-8 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">GuestBook Prototype v1.0</span>
              <span className="text-sm text-gray-500">Built with Next.js & Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
