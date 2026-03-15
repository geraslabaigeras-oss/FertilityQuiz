"use client";

import { motion } from "framer-motion";
import { ChevronRight, Clock, Users, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 w-full"
        >
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-serif text-purple-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Claira
            </h1>
            <p className="text-sm text-gray-600 mt-1">Fertility Insights Based on Real Data</p>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4"
          >
            Am I Wasting My Fertile Years?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 text-center mb-8"
          >
            Take our 2-minute quiz based on 1,054 real relationship posts analyzed
          </motion.p>

          {/* Stats Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-3xl font-bold text-purple-800">12,847</span>
            </div>
            <p className="text-gray-600">women have taken this quiz</p>
            <p className="text-sm text-gray-500 mt-1">Find out your personalized fertility timeline</p>
          </motion.div>

          {/* Reddit Quote */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200"
          >
            <p className="text-sm text-gray-600 italic mb-2">
              "My husband's (38M) increasing franticness about having kids is making me (33F) not want them at all"
            </p>
            <p className="text-xs text-gray-500">
              — r/relationships • 1,738 upvotes
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4 mb-8"
          >
            <h3 className="font-semibold text-gray-900 mb-3">Find out:</h3>
            {[
              { icon: "💫", text: "Your fertility window based on family history" },
              { icon: "🚩", text: "If your relationship timeline is on track" },
              { icon: "📊", text: "What women like you experienced" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/quiz')}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            START YOUR FREE ASSESSMENT
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Trust Elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>2 minutes</span>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-center mt-8 text-xs text-gray-500"
          >
            <p>Featured insights from r/relationships, r/TwoXChromosomes</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
