"use client"

import { useEffect, useState, Suspense } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Lock, Star } from "lucide-react"

function ResultsContent() {
  const searchParams = useSearchParams()
  const [answers, setAnswers] = useState<any>({})
  const [email, setEmail] = useState("")
  const [currentAge, setCurrentAge] = useState(28)

  useEffect(() => {
    const data = searchParams.get("data")
    if (data) {
      const parsed = JSON.parse(decodeURIComponent(data))
      setAnswers(parsed)
      setCurrentAge(parsed[1] || 28)
    }
  }, [searchParams])

  // Generate fertility timeline data
  const timelineData = Array.from({ length: 25 }, (_, i) => {
    const age = 25 + i
    let fertility = 100
    
    if (age <= 32) fertility = 100 - (age - 25) * 2
    else if (age <= 35) fertility = 86 - (age - 32) * 5
    else if (age <= 38) fertility = 71 - (age - 35) * 7
    else fertility = Math.max(10, 50 - (age - 38) * 5)
    
    return { age, fertility }
  })

  const currentFertility = timelineData.find(d => d.age === currentAge)?.fertility || 75

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-serif text-purple-900 mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Claira
          </h1>
          <h2 className="text-2xl text-gray-700">Your Fertility Timeline</h2>
        </motion.div>

        {/* Free Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="bg-white/95 backdrop-blur p-8 shadow-xl">
            {/* Visual Timeline */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Your Fertility Potential Over Time</h3>
              <div className="relative h-64 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full" viewBox="0 0 600 200">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map(y => (
                    <line
                      key={y}
                      x1="50"
                      y1={200 - y * 2}
                      x2="550"
                      y2={200 - y * 2}
                      stroke="#e5e7eb"
                      strokeDasharray="2 2"
                    />
                  ))}
                  
                  {/* Fertility curve */}
                  <path
                    d={`M ${timelineData.map((d, i) => `${50 + i * 20},${200 - d.fertility * 2}`).join(' L ')}`}
                    fill="none"
                    stroke="#9333ea"
                    strokeWidth="3"
                  />
                  
                  {/* Fill areas */}
                  <path
                    d={`M 50,200 ${timelineData.slice(0, 8).map((d, i) => `L ${50 + i * 20},${200 - d.fertility * 2}`).join(' ')} L 210,200 Z`}
                    fill="#10b981"
                    fillOpacity="0.2"
                  />
                  <path
                    d={`M 210,200 ${timelineData.slice(8, 14).map((d, i) => `L ${210 + i * 20},${200 - d.fertility * 2}`).join(' ')} L 330,200 Z`}
                    fill="#eab308"
                    fillOpacity="0.2"
                  />
                  <path
                    d={`M 330,200 ${timelineData.slice(14).map((d, i) => `L ${330 + i * 20},${200 - d.fertility * 2}`).join(' ')} L 550,200 Z`}
                    fill="#ef4444"
                    fillOpacity="0.2"
                  />
                  
                  {/* Current age indicator */}
                  <line
                    x1={50 + (currentAge - 25) * 20}
                    y1="0"
                    x2={50 + (currentAge - 25) * 20}
                    y2="200"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                  <text
                    x={50 + (currentAge - 25) * 20}
                    y="20"
                    textAnchor="middle"
                    className="fill-red-600 text-sm font-semibold"
                  >
                    You are here
                  </text>
                  
                  {/* Age labels */}
                  {[25, 30, 35, 40, 45].map((age, i) => (
                    <text
                      key={age}
                      x={50 + i * 100}
                      y="220"
                      textAnchor="middle"
                      className="fill-gray-600 text-sm"
                    >
                      {age}
                    </text>
                  ))}
                </svg>
              </div>
              
              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">Optimal (80%+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm">Good (60-79%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm">Declining (&lt;60%)</span>
                </div>
              </div>
            </div>

            {/* Timeline breakdown */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 bg-green-50 border-green-200">
                <h4 className="font-semibold text-green-800 mb-1">Optimal Window</h4>
                <p className="text-sm text-green-700">Ages {currentAge < 35 ? currentAge : "25"}-35</p>
                <p className="text-xs text-green-600 mt-1">80%+ conception rate</p>
              </Card>
              <Card className="p-4 bg-yellow-50 border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-1">Good Window</h4>
                <p className="text-sm text-yellow-700">Ages 36-38</p>
                <p className="text-xs text-yellow-600 mt-1">60-79% conception rate</p>
              </Card>
              <Card className="p-4 bg-red-50 border-red-200">
                <h4 className="font-semibold text-red-800 mb-1">Declining Window</h4>
                <p className="text-sm text-red-700">Ages 39-42</p>
                <p className="text-xs text-red-600 mt-1">30-59% conception rate</p>
              </Card>
            </div>

            {/* Sample insight */}
            <Card className="p-6 bg-purple-50 border-purple-200">
              <p className="text-purple-900">
                Based on your answers: Women in serious relationships who haven't discussed children by year 3 
                are <span className="font-bold">73% less likely</span> to have them with their current partner.
              </p>
            </Card>
          </Card>
        </motion.div>

        {/* Paywall Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white/95 backdrop-blur p-8 shadow-xl border-purple-200">
            <div className="text-center mb-6">
              <Lock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-semibold text-gray-900">
                🔒 Unlock Your Full Personalized Report
              </h3>
            </div>

            {/* What's included */}
            <div className="space-y-3 mb-8">
              {[
                "How your relationship compares to 500+ women",
                "Red flags in your situation",
                "Exact action plan with dates",
                "Stories from women who waited vs didn't",
                "Fertility clinic recommendations",
                "Egg freezing calculator"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Blurred preview */}
            <div className="relative mb-8">
              <Card className="p-6 blur-sm">
                <h4 className="font-semibold mb-2">Your Relationship Red Flags</h4>
                <p className="text-gray-600">
                  Based on your answers, we've identified 3 critical red flags that could impact...
                </p>
              </Card>
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold">Unlock to read</span>
              </div>
            </div>

            {/* Email and pricing */}
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter email to unlock"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg p-6"
              />
              
              <div className="text-center">
                <div className="mb-2">
                  <span className="text-gray-500 line-through text-lg">$49.99</span>
                  <span className="text-3xl font-bold text-purple-600 ml-3">$29.99</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">One-time payment • Instant access</p>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold"
                disabled={!email}
              >
                UNLOCK MY FULL REPORT - $29.99
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">247 women unlocked today</span>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.9/5 (1,847 reviews)</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  )
}
