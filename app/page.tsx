"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Star, Shield, Clock } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-purple-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Claira
          </h1>
        </motion.div>

        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Am I Wasting My Fertile Years?
          </h2>

          {/* Reddit quote */}
          <Card className="bg-white/95 backdrop-blur p-6 mb-8 border-purple-100">
            <div className="flex items-start gap-3">
              <div className="text-orange-500 font-bold">13631↑</div>
              <p className="text-gray-600 text-left italic">
                "(UPDATE): My MIL exposed my (28f) past group-assault to my husband (34m). Who had no idea. Wants him to divorce me. Please help me."
              </p>
            </div>
          </Card>

          {/* Counter */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-lg text-gray-700 mb-8"
          >
            <span className="font-bold text-purple-700">12,847 women</span> have taken this assessment
          </motion.div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-gray-700"
            >
              <span className="text-2xl">💫</span>
              <span>Personalized timeline</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="flex items-center justify-center gap-2 text-gray-700"
            >
              <span className="text-2xl">🚩</span>
              <span>Red flag detection</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="flex items-center justify-center gap-2 text-gray-700"
            >
              <span className="text-2xl">📊</span>
              <span>Real data insights</span>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/quiz">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-xl font-semibold shadow-xl">
                START YOUR FREE ASSESSMENT
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>2 minutes</span>
            </div>
          </motion.div>

          {/* Featured badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <span className="text-gray-500 text-sm">Featured on:</span>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">r/relationships</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">r/TwoXChromosomes</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
