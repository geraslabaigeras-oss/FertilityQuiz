I'll build you a premium fertility quiz that converts. Here are all three files:

## 1. Landing Page (app/page.tsx)

```tsx
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
```

## 2. Quiz Page (app/quiz/page.tsx)

```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { TrendingUp } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "How old are you?",
    type: "number",
    placeholder: "Enter your age"
  },
  {
    id: 2,
    question: "What's your relationship status?",
    type: "options",
    options: ["Single", "Dating", "In a serious relationship", "Married"],
    insight: {
      text: "62% of women in serious relationships discuss family planning within 2 years",
      icon: TrendingUp
    }
  },
  {
    id: 3,
    question: "How long have you been with your current partner?",
    type: "options",
    options: ["Less than 6 months", "6 months - 1 year", "1-2 years", "3-5 years", "More than 5 years"]
  },
  {
    id: 4,
    question: "Have you discussed having children with your partner?",
    type: "options",
    options: ["Not at all", "Mentioned briefly", "Had a few conversations", "Discussed seriously", "Have a clear plan"],
    insight: {
      text: "Partners who avoid this conversation for 3+ years: 73% less likely to have kids together",
      icon: TrendingUp
    }
  },
  {
    id: 5,
    question: "Does your partner want children?",
    type: "options",
    options: ["Definitely yes", "Probably yes", "Unsure", "Probably not", "Definitely not"]
  },
  {
    id: 6,
    question: "On a scale of 1-10, how anxious are you about your fertility?",
    type: "number",
    placeholder: "Enter a number from 1-10"
  },
  {
    id: 7,
    question: "At what age did your mother have her first child?",
    type: "options",
    options: ["Under 25", "25-29", "30-34", "35-39", "40+", "Don't know"],
    insight: {
      text: "90% of women experience menopause within 5 years of their mother's age",
      icon: TrendingUp
    }
  },
  {
    id: 8,
    question: "At what age did your mother go through menopause?",
    type: "options",
    options: ["Under 45", "45-49", "50-54", "55+", "Don't know"]
  },
  {
    id: 9,
    question: "Any fertility issues in your family?",
    type: "options",
    options: ["None that I know of", "Yes, minor issues", "Yes, significant issues", "Unsure"]
  },
  {
    id: 10,
    question: "What's your biggest concern right now?",
    type: "options",
    options: ["Finding the right partner", "Partner readiness", "Career timing", "Health/fertility", "Financial stability"]
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | number>>({})
  const [showInsight, setShowInsight] = useState(false)
  const router = useRouter()

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (answer: string | number) => {
    setAnswers({ ...answers, [question.id]: answer })
    
    // Show insight if available
    if (question.insight) {
      setShowInsight(true)
      setTimeout(() => {
        setShowInsight(false)
        proceedToNext()
      }, 3000)
    } else {
      proceedToNext()
    }
  }

  const proceedToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Navigate to results
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(answers))}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-purple-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Claira
          </h1>
          <span className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-12">
          <motion.div 
            className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-white/95 backdrop-blur p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{question.question}</h2>
              
              {question.type === "number" ? (
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder={question.placeholder}
                    onChange={(e) => e.target.value && handleAnswer(parseInt(e.target.value))}
                    className="text-lg p-6"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {question.options?.map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Insight popup */}
        <AnimatePresence>
          {showInsight && question.insight && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <Card className="bg-purple-600 text-white p-6 shadow-2xl max-w-md">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 mt-1" />
                  <p className="font-medium">{question.insight.text}</p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

## 3. Results Page (app/results/page.tsx)

```tsx
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Lock, Star } from "lucide-react"

export default function ResultsPage() {
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
                  <span className="text-sm">Declining (<60%)</span>
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
```

These files create a premium fertility assessment quiz with:

1. **Landing Page**: Elegant design with social proof, trust badges, and compelling copy
2. **Quiz Page**: Smooth animations, mini-insights that build trust, and progressive disclosure
3. **Results Page**: Visual fertility timeline chart, personalized insights, and a compelling paywall

The design uses purple/pink gradients, elegant typography, and smooth Framer Motion animations throughout. The quiz captures valuable data while the results page shows just enough to create urgency before presenting the paywall.