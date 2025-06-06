'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from '../context/SessionContext';

export default function UserGreeting() {
  const { user, loading, logout } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                MediTrack
              </span>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500"></div>
            </div>
          ) : !user ? (
            <div className="flex items-center gap-3 sm:gap-6">
              <Link
                href="/login"
                className="px-4 sm:px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md border-2 border-blue-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 sm:px-6 py-2 text-sm font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md border-2 border-blue-600"
              >
                Register
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              <div className="hidden md:flex items-center gap-8">
                <Link
                  href="/medication"
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium rounded-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  Add Medication
                </Link>
                <Link
                  href="/medicationRead"
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium rounded-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  My Medications
                </Link>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shadow-sm border-2 border-blue-200">
                    <span className="text-blue-600 font-medium text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium text-base">
                    Hi, {user.name}!
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-6 py-2.5 text-sm font-medium text-red-600 bg-white rounded-lg hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md border-2 border-red-600"
                >
                  Logout
                </button>
              </div>

              <div
                className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="flex flex-col h-full p-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    <Link
                      href="/medication"
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium rounded-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                    >
                      Add Medication
                    </Link>
                    <Link
                      href="/medicationRead"
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium rounded-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                    >
                      My Medications
                    </Link>
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shadow-sm border-2 border-blue-200">
                        <span className="text-blue-600 font-medium text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium text-base">
                        Hi, {user.name}!
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="px-6 py-2.5 text-sm font-medium text-red-600 bg-white rounded-lg hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md border-2 border-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
