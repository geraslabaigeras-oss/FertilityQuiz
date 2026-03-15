'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const benefits = [
    {
      icon: '💫',
      title: 'Science-Backed',
      description: 'Based on latest fertility research'
    },
    {
      icon: '🚩',
      title: 'Red Flag Detection',
      description: 'Identify potential fertility concerns early'
    },
    {
      icon: '📊',
      title: 'Personalized Report',
      description: 'Get your custom fertility timeline'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-purple-900">Claira</h1>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-center text-gray-900 mb-8"
        >
          Am I Wasting My Fertile Years?
        </motion.h2>

        {/* Reddit Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-2xl mx-auto"
        >
          <div className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <button className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-orange-500 font-bold text-sm">3.2k</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 italic">
                "I'm 32 and just found out my AMH levels are concerning. I wish I had known about this years ago. 
                Ladies, please don't wait - get informed about your fertility timeline before it's too late."
              </p>
              <p className="text-sm text-gray-500 mt-2">- r/TryingForABaby</p>
            </div>
          </div>
        </motion.div>

        {/* Women Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-2xl font-semibold text-gray-800 mb-12"
        >
          Join <span className="text-purple-600">12,847 women</span> who've discovered their fertility timeline
        </motion.p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mb-12"
        >
          <Link href="/quiz">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-6 px-12 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              Take the Free Fertility Quiz →
            </motion.button>
          </Link>
          <p className="text-gray-600 text-sm mt-4">Takes only 2 minutes • 100% Free</p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 items-center"
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Doctor Reviewed</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">100% Private</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">4.9/5 Rating</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
