import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-lg font-bold text-blue-700 dark:text-blue-500">
              GuestBook
            </Link>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              A guest feedback intelligence platform for hospitality businesses and homestay operators.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Home</Link></li>
              <li><Link href="/analysis" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Analyze Reviews</Link></li>
              <li><Link href="/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">About Us</Link></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-4">Contact</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Support: help@guestbook.ai
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GuestBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
