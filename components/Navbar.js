'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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

            <button className="p-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
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
