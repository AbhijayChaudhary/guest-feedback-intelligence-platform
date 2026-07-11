'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Analyze Reviews', href: '/analysis' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'About', href: '/about' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsThemeMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-700 dark:text-blue-500 tracking-tight">
              GuestBook
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium h-full flex items-center transition-all border-b-2 pt-1 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-500 font-semibold'
                      : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                aria-label="Select theme"
              >
                {theme === 'light' ? (
                  <span title="Light Mode">☀️</span>
                ) : (
                  <span title="Dark Mode">🌙</span>
                )}
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in duration-100">
                  <button
                    onClick={() => { toggleTheme('light'); setIsThemeMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                      theme === 'light' 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span>☀️</span> Light Mode
                  </button>
                  <button
                    onClick={() => { toggleTheme('dark'); setIsThemeMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                      theme === 'dark' 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span>🌙</span> Dark Mode
                  </button>
                </div>
              )}
            </div>

            {!loading && (
              isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="hidden sm:inline text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2.5 py-1.5 rounded-lg">
                    Hello, {user?.name}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      router.push('/');
                    }}
                    className="text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors px-3 py-1.5 border border-red-200 dark:border-red-800/50 rounded-lg bg-red-50/50 dark:bg-red-950/20 active:scale-95 duration-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1.5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors active:scale-95 duration-100"
                  >
                    Register
                  </Link>
                </div>
              )
            )}
            <button className="md:hidden p-2 text-gray-600 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
