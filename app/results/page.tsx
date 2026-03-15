'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Heart, 
  TrendingUp, 
  Lock, 
  CheckCircle,
  Sparkles,
  ChevronRight,
  Baby,
  Moon,
  Activity
} from 'lucide-react';

// Loading component
function ResultsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Analyzing your cycle...</p>
      </div>
    </div>
  );
}

// Main Results Component
function ResultsContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  
  // Extract data from search params
  const cycleLength = parseInt(searchParams.get('cycleLength') || '28');
  const lastPeriod = searchParams.get('lastPeriod') || new Date().toISOString().split('T')[0];
  const periodLength = parseInt(searchParams.get('periodLength') || '5');
  
  // Calculate cycle phases
  const ovulationDay = Math.floor(cycleLength / 2);
  const fertileStart = ovulationDay - 5;
  const fertileEnd = ovulationDay + 1;
  
  // Generate SVG points for fertility curve
  const generateCurvePoints = () => {
    const points = [];
    const width = 600;
    const height = 200;
    
    for (let day = 1; day <= cycleLength; day++) {
      const x = (day / cycleLength) * width;
      let y = height - 20;
      
      // Create fertility curve
      if (day >= fertileStart && day <= fertileEnd) {
        const relativeDay = day - fertileStart;
        const range = fertileEnd - fertileStart;
        const normalized = relativeDay / range;
        y = height - (20 + Math.sin(normalized * Math.PI) * (height - 40));
      }
      
      points.push(`${x},${y}`);
    }
    
    return points.join(' ');
  };
  
  // Timeline events
  const timelineEvents = [
    {
      day: 1,
      title: 'Menstruation Phase',
      description: 'Your body is shedding the uterine lining',
      icon: <Moon className="w-5 h-5" />,
      color: 'red'
    },
    {
      day: ovulationDay - 2,
      title: 'Fertile Window Begins',
      description: 'Optimal time for conception',
      icon: <Heart className="w-5 h-5" />,
      color: 'yellow'
    },
    {
      day: ovulationDay,
      title: 'Ovulation Day',
      description: 'Egg is released from ovary',
      icon: <Baby className="w-5 h-5" />,
      color: 'green'
    }
  ];
  
  const handleUnlock = async () => {
    if (!email) return;
    
    setIsUnlocking(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real app, this would process payment and unlock content
    console.log('Processing payment for:', email);
    setIsUnlocking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Fertility Analysis
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your {cycleLength}-day cycle, we've mapped out your fertility patterns and key dates
          </p>
        </motion.div>

        {/* Fertility Curve Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-600" />
            Fertility Curve
          </h2>
          
          <div className="relative overflow-x-auto">
            <svg 
              viewBox="0 0 600 250" 
              className="w-full h-64"
              preserveAspectRatio="none"
            >
              {/* Background zones */}
              <defs>
                <linearGradient id="fertileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Red zone - Menstruation */}
              <rect 
                x="0" 
                y="0" 
                width={(periodLength / cycleLength) * 600} 
                height="200"
                fill="#ef4444"
                opacity="0.1"
              />
              
              {/* Yellow zone - Pre-fertile */}
              <rect 
                x={(fertileStart / cycleLength) * 600 - 40} 
                y="0" 
                width="40" 
                height="200"
                fill="#f59e0b"
                opacity="0.1"
              />
              
              {/* Green zone - Fertile window */}
              <rect 
                x={(fertileStart / cycleLength) * 600} 
                y="0" 
                width={((fertileEnd - fertileStart) / cycleLength) * 600} 
                height="200"
                fill="url(#fertileGradient)"
              />
              
              {/* Fertility curve */}
              <polyline
                points={generateCurvePoints()}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Day markers */}
              {[1, ovulationDay, cycleLength].map(day => (
                <g key={day}>
                  <line
                    x1={(day / cycleLength) * 600}
                    y1="200"
                    x2={(day / cycleLength) * 600}
                    y2="210"
                    stroke="#9ca3af"
                    strokeWidth="2"
                  />
                  <text
                    x={(day / cycleLength) * 600}
                    y="230"
                    textAnchor="middle"
                    className="fill-gray-600 text-sm"
                  >
                    Day {day}
                  </text>
                </g>
              ))}
            </svg>
            
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span className="text-sm text-gray-600">Menstruation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span className="text-sm text-gray-600">Pre-fertile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 rounded"></div>
                <span className="text-sm text-gray-600">Fertile Window</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-6 border-t-4 border-${event.color}-500`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${event.color}-100 text-${event.color}-600 mb-4`}>
                {event.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {event.description}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                Day {event.day}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Key Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Your Fertile Window</h3>
              <p className="text-purple-100">
                Days {fertileStart} to {fertileEnd} of your cycle offer the highest chance of conception
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Next Period Date</h3>
              <p className="text-purple-100">
                Expected to start on {new Date(new Date(lastPeriod).getTime() + cycleLength * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Paywall Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/80 backdrop-blur-sm z-10 rounded-2xl"></div>
          
          {/* Blurred Preview */}
          <div className="filter blur-sm">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Personalized Recommendations
              </h2>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>

          {/* Unlock Content */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Unlock Full Analysis
                </h3>
                <p className="text-gray-600">
                  Get personalized recommendations, detailed predictions, and expert insights
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {['Personalized fertility tips', 'Monthly cycle predictions', 'Health recommendations'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-gray-400 line-through text-xl">$49.99</span>
                  <span className="text-3xl font-bold text-gray-800">$29.99</span>
                </div>
                <p className="text-sm text-green-600 font-medium">
                  Limited time offer - Save 40%!
                </p>
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 mb-4"
              />

              <button
                onClick={handleUnlock}
                disabled={isUnlocking || !email}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUnlocking ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Unlock Now
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Main export with Suspense
export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <ResultsContent />
    </Suspense>
  );
}
