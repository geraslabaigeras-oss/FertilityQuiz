'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface Answer {
  questionId: number;
  answer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your preferred work environment?",
    options: ["Remote", "Office", "Hybrid", "Flexible"]
  },
  {
    id: 2,
    question: "How do you handle stress?",
    options: ["Exercise", "Meditation", "Talk to friends", "Take a break"]
  },
  {
    id: 3,
    question: "What motivates you most?",
    options: ["Recognition", "Money", "Growth", "Impact"]
  },
  {
    id: 4,
    question: "How do you prefer to learn?",
    options: ["Reading", "Videos", "Hands-on", "Discussion"]
  },
  {
    id: 5,
    question: "What's your ideal team size?",
    options: ["Solo", "2-5 people", "6-10 people", "10+ people"]
  },
  {
    id: 6,
    question: "When are you most productive?",
    options: ["Early morning", "Late morning", "Afternoon", "Evening"]
  },
  {
    id: 7,
    question: "How do you make decisions?",
    options: ["Data-driven", "Intuition", "Consensus", "Expert advice"]
  },
  {
    id: 8,
    question: "What's your communication style?",
    options: ["Direct", "Diplomatic", "Analytical", "Empathetic"]
  },
  {
    id: 9,
    question: "How do you recharge?",
    options: ["Alone time", "Social activities", "Nature", "Hobbies"]
  },
  {
    id: 10,
    question: "What's your planning style?",
    options: ["Detailed plans", "Flexible outline", "Spontaneous", "Goal-oriented"]
  }
];

const insights = {
  2: "🧠 Understanding your stress management style is crucial for long-term success!",
  4: "📚 Your learning preference shapes how you absorb and retain information!",
  7: "🎯 Your decision-making style influences your leadership potential!"
};

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showInsight, setShowInsight] = useState(false);
  const [insightText, setInsightText] = useState('');

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    if (showInsight) {
      const timer = setTimeout(() => {
        setShowInsight(false);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          completeQuiz();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showInsight, currentQuestion]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, answer }];
    setAnswers(newAnswers);

    // Check if we need to show an insight
    if ([2, 4, 7].includes(currentQuestion + 1)) {
      setInsightText(insights[currentQuestion + 1 as keyof typeof insights]);
      setShowInsight(true);
    } else if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    // Store answers in sessionStorage for the results page
    sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
    router.push('/results');
  };

  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  const insightVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-white text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-purple-950/30 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showInsight ? (
            <motion.div
              key={currentQuestion}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                {questions[currentQuestion].question}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    className="bg-purple-600/50 hover:bg-purple-600/70 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 backdrop-blur-sm border border-purple-400/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="insight"
              variants={insightVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-purple-400/30"
            >
              <div className="text-center">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-6xl mb-6"
                >
                  ✨
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Insight!</h3>
                <p className="text-lg md:text-xl text-purple-100">{insightText}</p>
                <motion.div
                  className="mt-6 text-purple-300 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Continuing automatically...
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
