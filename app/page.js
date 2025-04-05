'use client';

import Link from "next/link";
import { useSession } from "./context/SessionContext";

export default function Home() {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            
           
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <Link 
                  href="/medicationRead" 
                  className="hidden sm:inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  My Medications
                </Link>
                <Link 
                  href="/medication" 
                  className="hidden sm:inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  Add Medication
                </Link>
              </>
            ) : (
              <>
                
              </>
            )}
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Take Control of Your <span className="text-blue-600">Medication</span> Journey
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Easily track your medications, set reminders, and maintain your health records in one secure place.
            </p>
            <div className="flex space-x-4">
              {(
                <>
                  {!user && <Link 
                    href="/register" 
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
                  >
                    Create Account
                  </Link>}
                  <Link 
                    href="/about" 
                    className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Medication Tracking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Log your medications and dosages</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Reminders</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Never miss a dose with smart reminders</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Secure & Private</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Your health data is always protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
