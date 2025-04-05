'use client';

import Link from "next/link";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        

        <main className="space-y-16">
      
          <section className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Your Personal <span className="text-blue-600">Medication</span> Assistant
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Medix is your comprehensive solution for managing medications, tracking health records, and maintaining your well-being with ease and confidence.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Medication Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily log and manage your medications, dosages, and schedules. Keep all your prescriptions organized in one secure place.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Intelligent Reminders</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Never miss a dose with customizable reminders. Set up notifications that work best for your schedule and lifestyle.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your health information is protected with enterprise-grade security. Your data stays private and secure at all times.
              </p>
            </div>
          </section>
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Choose Medix?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">Simplified Medication Management</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Streamline your medication routine with an intuitive interface that makes tracking and managing your prescriptions effortless.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-600">Better Health Outcomes</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Stay on top of your medication schedule to improve adherence and achieve better health results.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-purple-600">Peace of Mind</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Know that your medication information is always accessible and your health is being properly managed.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">Family Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Share medication information with caregivers or family members when needed, while maintaining control over your privacy.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of users who are managing their medications with confidence.
            </p>
            <Link 
              href="/register" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Get Started Today
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
