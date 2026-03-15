"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

interface InsightCard {
  afterQuestion: number;
  title: string;
  message: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your age range?",
    options: ["18-24", "25-30", "31-35", "36-40", "40+"],
    category: "age",
  },
  {
    id: 2,
    question: "What is your current relationship status?",
    options: [
      "Single",
      "In a relationship",
      "Engaged",
      "Married",
      "It's complicated",
    ],
    category: "relationship",
  },
  {
    id: 3,
    question: "Have you and your partner discussed having children?",
    options: [
      "Yes, we're aligned",
      "Yes, but we disagree",
      "Not yet",
      "I don't have a partner",
      "Prefer not to say",
    ],
    category: "discussed_kids",
  },
  {
    id: 4,
    question: "How often do you feel anxious about your fertility timeline?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Constantly"],
    category: "anxiety",
  },
  {
    id: 5,
    question: "Has your mother or grandmother experienced early menopause?",
    options: [
      "Yes, my mother",
      "Yes, my grandmother",
      "Both",
      "Neither",
      "I'm not sure",
    ],
    category: "mother_history",
  },
  {
    id: 6,
    question: "What is your biggest concern about fertility right now?",
    options: [
      "Not knowing my fertility window",
      "Financial readiness",
      "Career timing",
      "Finding the right partner",
      "Health concerns",
    ],
    category: "concern",
  },
  {
    id: 7,
    question: "Have you ever had your fertility tested or assessed?",
    options: [
      "Yes, recently",
      "Yes, but it was a while ago",
      "No, but I plan to",
      "No, and I haven't considered it",
      "I didn't know that was possible",
    ],
    category: "fertility_testing",
  },
  {
    id: 8,
    question: "How familiar are you with egg freezing as an option?",
    options: [
      "Very familiar — I've researched it",
      "Somewhat familiar",
      "I've heard of it but don't know details",
      "Not familiar at all",
      "I've already done it",
    ],
    category: "egg_freezing_awareness",
  },
  {
    id: 9,
    question: "How would you rate your overall reproductive health knowledge?",
    options: [
      "Expert level",
      "Above average",
      "Average",
      "Below average",
      "I know very little",
    ],
    category: "health_knowledge",
  },
  {
    id: 10,
    question:
      "What would motivate you most to take action on your fertility plan?",
    options: [
      "A personalized timeline",
      "Understanding my biological data",
      "Hearing from others in my situation",
      "A clear, affordable plan",
      "Support from a fertility coach",
    ],
    category: "motivation",
  },
];

const insightCards: InsightCard[] = [
  {
    afterQuestion: 2,
    title: "💡 Did you know?",
    message:
      "Studies show that couples who discuss fertility planning early report 40% less relationship stress around the topic.",
  },
  {
    afterQuestion: 4,
    title: "🧠 Insight",
    message:
      "Fertility anxiety affects 1 in 3 women aged 25-35. You're not alone — and awareness is the first step to empowerment.",
  },
  {
    afterQuestion: 7,
    title: "📊 Quick Fact",
    message:
      "Only 10% of women have had a formal fertility assessment before age 35, yet early testing can reveal critical insights about your timeline.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  const [showInsight, setShowInsight] = useState(false);
  const [currentInsight, setCurrentInsight] = useState<InsightCard | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const proceedToNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion((prev) => prev + 1);
      setIsTransitioning(false);
    } else {
      router.push("/results?data=" + encodeURIComponent(JSON.stringify(answers)));
    }
  }, [currentQuestion, answers, router]);

  useEffect(() => {
    if (showInsight) {
      const timer = setTimeout(() => {
        setShowInsight(false);
        setCurrentInsight(null);
        proceedToNext();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showInsight, proceedToNext]);

  const handleAnswer = (option: string) => {
    if (isTransitioning || showInsight) return;

    const question = questions[currentQuestion];
    const newAnswers = { ...answers, [question.category]: option };
    setAnswers(newAnswers);
    setIsTransitioning(true);

    const insight = insightCards.find(
      (ic) => ic.afterQuestion === currentQuestion + 1
    );

    setTimeout(() => {
      if (insight) {
        setCurrentInsight(insight);
        setShowInsight(true);
      } else {
        if (currentQuestion < questions.length - 1) {
          setDirection(1);
          setCurrentQuestion((prev) => prev + 1);
          setIsTransitioning(false);
        } else {
          router.push(
            "/results?data=" + encodeURIComponent(JSON.stringify(newAnswers))
          );
        }
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentQuestion > 0 && !isTransitioning && !showInsight) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col items-center justify-start px-4 py-8 overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0 || isTransitioning || showInsight}
            className="text-purple-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1 text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <span className="text-purple-300 text-sm font-medium">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-violet-400 to-fuchsia-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-2xl flex-1 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait" custom={direction}>
          {showInsight && currentInsight ? (
            <motion.div
              key="insight"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-500 rounded-2xl blur-lg opacity-60 animate-pulse" />
                <div className="relative bg-gradient-to-br from-purple-900/90 via-violet-900/90 to-purple-800/90 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {currentInsight.title}
                    </h3>
                    <p className="text-purple-200 leading-relaxed text-base">
                      {currentInsight.message}
                    </p>
                  </div>
                  {/* Auto-progress indicator */}
                  <div className="mt-6 w-full h-1 bg-purple-800/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              {/* Question */}
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-white text-center mb-8 leading-tight"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {question.question}
              </motion.h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {question.options.map((option, index) => {
                  const isSelected = answers[question.category] === option;

                  return (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.15 + index * 0.06,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      onClick={() => handleAnswer(option)}
                      disabled={isTransitioning}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        group relative w-full text-left px-6 py-4 rounded-xl border transition-all duration-200
                        ${
                          isSelected
                            ? "bg-purple-600/40 border-purple-400/70 text-white shadow-lg shadow-purple-500/20"
                            : "bg-white/5 border-white/10 text-purple-100 hover:bg-purple-500/20 hover:border-purple-400/40 hover:text-white"
                        }
                        disabled:cursor-not-allowed backdrop-blur-sm
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`
                            flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200
                            ${
                              isSelected
                                ? "bg-purple-500 text-white"
                                : "bg-white/10 text-purple-300 group-hover:bg-purple-500/30 group-hover:text-white"
                            }
                          `}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-base font-medium">{option}</span>
                      </div>

                      {/* Selection indicator */}
                      {isSelected && (
                        <motion.div
                          layoutId="selected"
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg
                            className="w-5 h-5 text-purple-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      <motion.p
        className="text-purple-400/50 text-xs mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click an option to continue • Your answers are private
      </motion.p>
    </div>
  );
}
