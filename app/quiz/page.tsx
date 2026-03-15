"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const COLORS = {
  cream: "#FAF8F5",
  terracotta: "#E07A5F",
  terracottaLight: "rgba(224, 122, 95, 0.08)",
  terracottaBorder: "rgba(224, 122, 95, 0.3)",
  charcoal: "#2C2C2C",
  charcoalLight: "rgba(44, 44, 44, 0.5)",
  charcoalLighter: "rgba(44, 44, 44, 0.15)",
  white: "#FFFFFF",
};

type QuestionType = "number" | "choice";

interface Insight {
  text: string;
}

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  placeholder?: string;
  min?: number;
  max?: number;
  options?: string[];
  insight?: Insight;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How old are you?",
    type: "number",
    placeholder: "Enter your age",
    min: 16,
    max: 60,
  },
  {
    id: 2,
    text: "What's your current relationship status?",
    type: "choice",
    options: [
      "Single",
      "Casually dating",
      "In a serious relationship",
      "Married or engaged",
    ],
    insight: {
      text: "Among women in serious relationships, 62% discuss family planning within the first 2 years.",
    },
  },
  {
    id: 3,
    text: "How long have you been with your current partner?",
    type: "choice",
    options: [
      "Less than 6 months",
      "6 months to 1 year",
      "1–2 years",
      "3–5 years",
      "More than 5 years",
      "Not currently with someone",
    ],
  },
  {
    id: 4,
    text: "Have you and your partner discussed having children?",
    type: "choice",
    options: [
      "Not at all",
      "Mentioned briefly",
      "Had a few conversations",
      "Discussed in detail",
      "We have a clear plan",
    ],
    insight: {
      text: "Partners who avoid the children conversation for 3+ years are 73% less likely to have kids together.",
    },
  },
  {
    id: 5,
    text: "Does your partner want children?",
    type: "choice",
    options: [
      "Definitely yes",
      "Probably yes",
      "Unsure",
      "Probably not",
      "Definitely not",
      "Not applicable",
    ],
  },
  {
    id: 6,
    text: "On a scale of 1–10, how anxious are you about your fertility?",
    type: "number",
    placeholder: "1–10",
    min: 1,
    max: 10,
  },
  {
    id: 7,
    text: "At what age did your mother have her first child?",
    type: "choice",
    options: [
      "Under 25",
      "25–29",
      "30–34",
      "35–39",
      "40 or older",
      "I don't know",
    ],
    insight: {
      text: "Research shows 90% of women experience menopause within 5 years of their mother's age.",
    },
  },
  {
    id: 8,
    text: "At what age did your mother go through menopause?",
    type: "choice",
    options: [
      "Under 45",
      "45–49",
      "50–54",
      "55 or older",
      "I don't know",
    ],
  },
  {
    id: 9,
    text: "Are there any known fertility issues in your immediate family?",
    type: "choice",
    options: [
      "None that I know of",
      "Minor issues",
      "Significant issues",
      "I'm not sure",
    ],
  },
  {
    id: 10,
    text: "What's your biggest concern right now?",
    type: "choice",
    options: [
      "Finding the right partner",
      "Partner not being ready",
      "Career timing",
      "My age and fertility",
      "Financial stability",
    ],
  },
];

function InsightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2C6.13 2 3 5.13 3 9C3 11.38 4.19 13.47 6 14.74V17C6 17.55 6.45 18 7 18H13C13.55 18 14 17.55 14 17V14.74C15.81 13.47 17 11.38 17 9C17 5.13 13.87 2 10 2Z"
        fill={COLORS.terracotta}
        opacity="0.15"
      />
      <path
        d="M10 2C6.13 2 3 5.13 3 9C3 11.38 4.19 13.47 6 14.74V17C6 17.55 6.45 18 7 18H13C13.55 18 14 17.55 14 17V14.74C15.81 13.47 17 11.38 17 9C17 5.13 13.87 2 10 2ZM10 4C12.76 4 15 6.24 15 9C15 10.65 14.18 12.1 12.88 13.01L12 13.59V16H8V13.59L7.12 13.01C5.82 12.1 5 10.65 5 9C5 6.24 7.24 4 10 4Z"
        fill={COLORS.terracotta}
      />
      <rect x="8" y="18.5" width="4" height="1" rx="0.5" fill={COLORS.terracotta} />
    </svg>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [numberValue, setNumberValue] = useState("");
  const [showInsight, setShowInsight] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex) / totalQuestions) * 100;

  const goToNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setDirection(1);
      setNumberValue("");
      setSelectedOption(null);
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push(
        `/results?data=${encodeURIComponent(JSON.stringify(answers))}`
      );
    }
  }, [currentIndex, totalQuestions, answers, router]);

  const handleChoiceSelect = useCallback(
    (option: string) => {
      setSelectedOption(option);
      const newAnswers = { ...answers, [currentQuestion.id]: option };
      setAnswers(newAnswers);

      if (currentQuestion.insight) {
        setTimeout(() => {
          setShowInsight(true);
        }, 400);
      } else {
        setTimeout(() => {
          if (currentIndex < totalQuestions - 1) {
            setDirection(1);
            setNumberValue("");
            setSelectedOption(null);
            setCurrentIndex((prev) => prev + 1);
          } else {
            router.push(
              `/results?data=${encodeURIComponent(JSON.stringify(newAnswers))}`
            );
          }
        }, 600);
      }
    },
    [answers, currentQuestion, currentIndex, totalQuestions, router]
  );

  useEffect(() => {
    if (showInsight) {
      const timer = setTimeout(() => {
        setShowInsight(false);
        setTimeout(() => {
          goToNext();
        }, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showInsight, goToNext]);

  const handleNumberSubmit = () => {
    const val = parseInt(numberValue, 10);
    if (
      !isNaN(val) &&
      val >= (currentQuestion.min ?? 0) &&
      val <= (currentQuestion.max ?? 999)
    ) {
      setAnswers({ ...answers, [currentQuestion.id]: numberValue });
      goToNext();
    }
  };

  const isNumberValid = () => {
    const val = parseInt(numberValue, 10);
    return (
      !isNaN(val) &&
      val >= (currentQuestion.min ?? 0) &&
      val <= (currentQuestion.max ?? 999)
    );
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: COLORS.cream }}
    >
      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: COLORS.cream }}
      >
        <div className="max-w-2xl mx-auto px-6 pt-5 pb-3 flex items-center justify-between">
          <span
            className="text-xl tracking-wide"
            style={{
              fontFamily: "'Cormorant Garamond', 'Cormorant', Georgia, serif",
              color: COLORS.charcoal,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Claira
          </span>
          <span
            className="text-sm"
            style={{
              color: COLORS.charcoalLight,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto px-6 pb-4">
          <div
            className="w-full h-[3px] rounded-full overflow-hidden"
            style={{ backgroundColor: COLORS.charcoalLighter }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: COLORS.terracotta }}
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-lg relative">
          <AnimatePresence mode="wait" custom={direction}>
            {!showInsight ? (
              <motion.div
                key={`question-${currentQuestion.id}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="w-full"
              >
                {/* Question text */}
                <motion.h2
                  className="mb-10 leading-tight"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', 'Cormorant', Georgia, serif",
                    color: COLORS.charcoal,
                    fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                    fontWeight: 500,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {currentQuestion.text}
                </motion.h2>

                {/* Number input */}
                {currentQuestion.type === "number" && (
                  <div className="space-y-6">
                    <Input
                      type="number"
                      value={numberValue}
                      onChange={(e) => setNumberValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && isNumberValid()) {
                          handleNumberSubmit();
                        }
                      }}
                      placeholder={currentQuestion.placeholder}
                      min={currentQuestion.min}
                      max={currentQuestion.max}
                      autoFocus
                      className="h-16 text-xl border-2 rounded-xl px-5 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-200"
                      style={{
                        backgroundColor: COLORS.white,
                        borderColor: numberValue
                          ? COLORS.terracotta
                          : COLORS.charcoalLighter,
                        color: COLORS.charcoal,
                        fontFamily:
                          "'Cormorant Garamond', 'Cormorant', Georgia, serif",
                        fontSize: "1.375rem",
                        fontWeight: 500,
                      }}
                    />
                    <Button
                      onClick={handleNumberSubmit}
                      disabled={!isNumberValid()}
                      className="w-full h-14 text-base font-medium rounded-xl transition-all duration-300 border-0"
                      style={{
                        backgroundColor: isNumberValid()
                          ? COLORS.terracotta
                          : COLORS.charcoalLighter,
                        color: isNumberValid()
                          ? COLORS.white
                          : COLORS.charcoalLight,
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        letterSpacing: "0.02em",
                        cursor: isNumberValid() ? "pointer" : "not-allowed",
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {/* Multiple choice */}
                {currentQuestion.type === "choice" && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      return (
                        <motion.button
                          key={option}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: idx * 0.05,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          onClick={() => handleChoiceSelect(option)}
                          className="w-full text-left rounded-xl px-6 py-4 border-2 transition-all duration-200 cursor-pointer"
                          style={{
                            backgroundColor: isSelected
                              ? COLORS.terracottaLight
                              : COLORS.white,
                            borderColor: isSelected
                              ? COLORS.terracotta
                              : "rgba(44, 44, 44, 0.1)",
                            color: COLORS.charcoal,
                            fontFamily:
                              "system-ui, -apple-system, sans-serif",
                            fontSize: "1.05rem",
                            fontWeight: isSelected ? 500 : 400,
                            lineHeight: 1.5,
                          }}
                          whileHover={{
                            borderColor: COLORS.terracotta,
                            scale: 1.01,
                          }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <span className="flex items-center gap-4">
                            <span
                              className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                              style={{
                                borderColor: isSelected
                                  ? COLORS.terracotta
                                  : COLORS.charcoalLighter,
                              }}
                            >
                              {isSelected && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeOut",
                                  }}
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{
                                    backgroundColor: COLORS.terracotta,
                                  }}
                                />
                              )}
                            </span>
                            <span>{option}</span>
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ) : (
              /* INSIGHT CARD */
              <motion.div
                key={`insight-${currentQuestion.id}`}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="w-full"
              >
                <div
                  className="rounded-2xl p-8 border-l-4"
                  style={{
                    backgroundColor: COLORS.white,
                    borderLeftColor: COLORS.terracotta,
                    boxShadow:
                      "0 4px 24px rgba(44, 44, 44, 0.06), 0 1px 4px rgba(44, 44, 44, 0.04)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: COLORS.terracottaLight }}
                    >
                      <InsightIcon />
                    </div>
                    <div>
                      <p
                        className="text-xs uppercase tracking-widest mb-3 font-medium"
                        style={{ color: COLORS.terracotta }}
                      >
                        Did you know?
                      </p>
                      <p
                        className="leading-relaxed"
                        style={{
                          fontFamily:
                            "'Cormorant Garamond', 'Cormorant', Georgia, serif",
                          color: COLORS.charcoal,
                          fontSize: "1.25rem",
                          fontWeight: 500,
                          lineHeight: 1.6,
                        }}
                      >
                        {currentQuestion.insight?.text}
                      </p>
                    </div>
                  </div>
                  {/* Progress dots for insight */}
                  <div className="flex justify-center mt-6 gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: COLORS.terracotta }}
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: dot * 0.8,
                          repeat: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Subtle footer */}
      <footer className="pb-6 text-center">
        <p
          className="text-xs"
          style={{
            color: COLORS.charcoalLighter,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Your answers are private and secure
        </p>
      </footer>
    </div>
  );
}
