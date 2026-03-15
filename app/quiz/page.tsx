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
