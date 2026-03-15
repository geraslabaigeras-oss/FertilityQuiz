"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type Answer = string | number | null;

interface QuizState {
  currentQuestion: number;
  answers: Answer[];
  direction: "forward" | "backward";
  showInsight: boolean;
}

const RELATIONSHIP_STATUSES = [
  "Single (looking)",
  "Casually dating",
  "Serious relationship",
  "Engaged",
  "Married",
];

const TOGETHER_DURATIONS = [
  "Less than 1 year",
  "1-2 years",
  "3-4 years",
  "5-7 years",
  "8+ years",
];

const DISCUSSION_OPTIONS = [
  "Not at all",
  "He changes the subject",
  "We've talked briefly",
  "We've had serious conversations",
  "We have a clear plan",
];

const WANTS_CHILDREN_OPTIONS = [
  "Definitely yes",
  'Says yes, but "not yet"',
  "He's unsure",
  "He doesn't want them",
  "He won't give a clear answer",
];

const RESPONSE_OPTIONS = [
  "Engaged and thoughtful",
  "Vague or dismissive",
  "Gets defensive or annoyed",
  "Promises 'we'll talk later'",
  "We haven't discussed it",
];

const MOTHER_AGE_OPTIONS = [
  "Under 25",
  "25-29",
  "30-34",
  "35-39",
  "40+",
  "Don't know",
];

const NOT_READY_OPTIONS = [
  "Give him more time",
  "Set a deadline",
  "Consider leaving",
  "Already considering leaving",
  "He hasn't said that",
];

const FEAR_OPTIONS = [
  "Running out of time with the wrong person",
  "Missing my chance at motherhood",
  "Resenting him if I stay",
  "Starting over at my age",
  "Making the wrong choice",
];

const INSIGHTS: Record<number, { condition?: (answers: Answer[]) => boolean; text: string }> = {
  3: {
    condition: (answers) => {
      const duration = answers[2] as string;
      const discussion = answers[3] as string;
      const longRelationship = ["3-4 years", "5-7 years", "8+ years"].includes(duration);
      const avoidsTalk = ["Not at all", "He changes the subject"].includes(discussion);
      return longRelationship && avoidsTalk;
    },
    text: "Research shows that in relationships over 3 years, partners who avoid the children conversation are 73% less likely to have them together.",
  },
  4: {
    condition: (answers) => {
      const duration = answers[2] as string;
      const wantsKids = answers[4] as string;
      const longRelationship = ["3-4 years", "5-7 years", "8+ years"].includes(duration);
      return longRelationship && wantsKids === 'Says yes, but "not yet"';
    },
    text: '"Not yet" for 3+ years often means "not with you." This is one of the hardest truths — but also the most freeing once you face it.',
  },
  7: {
    text: "Most women experience menopause around the same age as their mother (±5 years). Your mother's fertility history is one of the strongest predictors of your own timeline.",
  },
};

export default function QuizPage() {
  const router = useRouter();
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: Array(10).fill(null),
    direction: "forward",
    showInsight: false,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [ageInput, setAgeInput] = useState("");
  const [anxietyValue, setAnxietyValue] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isInRelationship = useCallback(() => {
    const status = state.answers[1] as string;
    return ["Serious relationship", "Engaged", "Married"].includes(status);
  }, [state.answers]);

  const getEffectiveQuestionIndex = useCallback(
    (displayIndex: number): number => {
      if (!isInRelationship() && displayIndex >= 2) {
        return displayIndex + 1;
      }
      return displayIndex;
    },
    [isInRelationship]
  );

  const getTotalQuestions = useCallback(() => {
    return isInRelationship() ? 10 : 9;
  }, [isInRelationship]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;

    const total = getTotalQuestions();
    const effectiveIdx = getEffectiveQuestionIndex(state.currentQuestion);

    // Check for insight
    const insight = INSIGHTS[effectiveIdx];
    if (insight && !state.showInsight) {
      const shouldShow = insight.condition ? insight.condition(state.answers) : true;
      if (shouldShow) {
        setState((prev) => ({ ...prev, showInsight: true }));
        return;
      }
    }

    if (state.currentQuestion >= total - 1) {
      // Encode answers and navigate to results
      const encoded = btoa(JSON.stringify(state.answers));
      router.push(`/results?d=${encodeURIComponent(encoded)}`);
      return;
    }

    setIsAnimating(true);
    setState((prev) => ({
      ...prev,
      direction: "forward",
      showInsight: false,
      currentQuestion: prev.currentQuestion + 1,
    }));
    setTimeout(() => setIsAnimating(false), 400);
  }, [state, isAnimating, getTotalQuestions, getEffectiveQuestionIndex, router]);

  const goToPrev = useCallback(() => {
    if (isAnimating || state.currentQuestion === 0) return;
    setIsAnimating(true);
    setState((prev) => ({
      ...prev,
      direction: "backward",
      showInsight: false,
      currentQuestion: prev.currentQuestion - 1,
    }));
    setTimeout(() => setIsAnimating(false), 400);
  }, [state.currentQuestion, isAnimating]);

  const setAnswer = useCallback(
    (value: Answer, autoAdvance = true) => {
      const effectiveIdx = getEffectiveQuestionIndex(state.currentQuestion);
      setState((prev) => {
        const newAnswers = [...prev.answers];
        newAnswers[effectiveIdx] = value;
        return { ...prev, answers: newAnswers };
      });
      if (autoAdvance) {
        setTimeout(() => goToNext(), 350);
      }
    },
    [state.currentQuestion, getEffectiveQuestionIndex, goToNext]
  );

  const effectiveIdx = getEffectiveQuestionIndex(state.currentQuestion);
  const total = getTotalQuestions();
  const progress = ((state.currentQuestion + 1) / total) * 100;

  if (!mounted) return null;

  // Insight overlay
  if (state.showInsight) {
    const insight = INSIGHTS[effectiveIdx];
    if (insight) {
      return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FDF8F4" }}>
          <div
            className="flex-1 flex items-center justify-center px-6"
            style={{
              animation: "fadeSlideUp 0.5s ease-out",
            }}
          >
            <div className="max-w-lg w-full text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center"
                style={{ backgroundColor: "#C4725A20" }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C4725A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>

              <p
                className="text-lg leading-relaxed mb-12"
                style={{
                  color: "#3D2B1F",
                  fontFamily: "'Georgia', serif",
                  lineHeight: "1.8",
                }}
              >
                {insight.text}
              </p>

              <button
                onClick={() => {
                  setState((prev) => ({ ...prev, showInsight: false }));
                  setTimeout(() => {
                    if (state.currentQuestion >= total - 1) {
                      const encoded = btoa(JSON.stringify(state.answers));
                      router.push(`/results?d=${encodeURIComponent(encoded)}`);
                    } else {
                      setIsAnimating(true);
                      setState((prev) => ({
                        ...prev,
                        direction: "forward",
                        currentQuestion: prev.currentQuestion + 1,
                      }));
                      setTimeout(() => setIsAnimating(false), 400);
                    }
                  }, 50);
                }}
                className="px-8 py-3 rounded-full text-white text-sm tracking-wide transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: "#C4725A",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Continue
              </button>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeSlideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      );
    }
  }

  const renderQuestion = () => {
    const animClass = state.direction === "forward" ? "slideInRight" : "slideInLeft";

    switch (effectiveIdx) {
      // Q0: Age
      case 0:
        return (
          <div key="q0" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">How old are you?</h2>
            <p className="question-subtitle">Your age is the single most important factor in your fertility timeline.</p>
            <div className="flex flex-col items-center gap-6 mt-8">
              <input
                type="number"
                inputMode="numeric"
                min={18}
                max={55}
                value={ageInput}
                onChange={(e) => setAgeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = parseInt(ageInput);
                    if (val >= 18 && val <= 55) {
                      setAnswer(val, true);
                    }
                  }
                }}
                placeholder="Enter your age"
                className="text-center text-3xl py-4 px-6 rounded-2xl border-2 w-48 outline-none transition-all duration-300 focus:shadow-lg"
                style={{
                  backgroundColor: "white",
                  borderColor: ageInput ? "#C4725A" : "#E8DDD5",
                  color: "#3D2B1F",
                  fontFamily: "'Georgia', serif",
                }}
              />
              {ageInput && parseInt(ageInput) >= 18 && parseInt(ageInput) <= 55 && (
                <button
                  onClick={() => setAnswer(parseInt(ageInput), true)}
                  className="next-button"
                  style={{ animation: "fadeIn 0.3s ease-out" }}
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        );

      // Q1: Relationship status
      case 1:
        return (
          <div key="q1" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">What&apos;s your relationship status?</h2>
            <p className="question-subtitle">This helps us understand the dynamics that matter most.</p>
            <div className="options-grid mt-8">
              {RELATIONSHIP_STATUSES.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswer(option)}
                  className={`option-button ${state.answers[1] === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      // Q2: How long together (only if in relationship)
      case 2:
        return (
          <div key="q2" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">How long have you been together?</h2>
            <p className="question-subtitle">Time reveals intention. This is more important than most people realize.</p>
            <div className="options-grid mt-8">
              {TOGETHER_DURATIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswer(option)}
                  className={`option-button ${state.answers[2] === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      // Q3: Discussed children
      case 3:
        return (
          <div key="q3" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">Have you two discussed having children?</h2>
            <p className="question-subtitle">The conversation itself — or the avoidance of it — tells you everything.</p>
            <div className="options-grid mt-8">
              {DISCUSSION_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswer(option)}
                  className={`option-button ${state.answers[3] === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      // Q4: Does he want children
      case 4:
        return (
          <div key="q4" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">Does he want children?</h2>
            <p className="question-subtitle">Not what he says to keep you — what he actually shows you.</p>
            <div className="options-grid mt-8">
              {WANTS_CHILDREN_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswer(option)}
                  className={`option-button ${state.answers[4] === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      // Q5: His response when you bring it up
      case 5:
        return (
          <div key="q5" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">What&apos;s his usual response when you bring it up?</h2>
            <p className="question-subtitle">Patterns of response are patterns of intent.</p>
            <div className="options-grid mt-8">
              {RESPONSE_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswer(option)}
                  className={`option-button ${state.answers[5] === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      // Q6: Anxiety scale
      case 6:
        return (
          <div key="q6" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">On a scale of 1–10, how anxious are you about your timeline?</h2>
            <p className="question-subtitle">1 = completely at peace &nbsp;&nbsp; 10 = it keeps you up at night</p>
            <div className="flex flex-col items-center gap-8 mt-10">
              <div
                className="text-6xl font-light"
                style={{
                  color: anxietyValue >= 7 ? "#C4725A" : "#3D2B1F",
                  fontFamily: "'Georgia', serif",
                  transition: "color 0.3s ease",
                }}
              >
                {anxietyValue}
              </div>
              <div className="w-full max-w-sm px-4">
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={anxietyValue}
                  onChange={(e) => setAnxietyValue(parseInt(e.target.value))}
                  className="anxiety-slider w-full"
                />
                <div className="flex justify-between mt-2 text-xs" style={{ color: "#8B7B6B" }}>
                  <span>At peace</span>
                  <span>Constant worry</span>
                </div>
              </div>
              <button
                onClick={() => setAnswer(anxietyValue, true)}
                className="next-button mt-4"
              >
                Continue
              </button>
            </div>
          </div>
        );

      // Q7: Mother's age at first child
      case 7:
        return (
          <div key="q7" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">At what age did your mother have her first child?</h2>
            <p className="question-subtitle">Your family history shapes your biological window more than you might think.</p>
            <div className="options-grid mt-8">
              {MOTHER_AGE_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswer(option)}
                  className={`option-button ${state.answers[7] === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      // Q8: If he said "I'm not ready"
      case 8:
        return (
          <div key="q8" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">If he said &quot;I&apos;m not ready&quot; today, would you:</h2>
            <p className="question-subtitle">Be honest. Your gut reaction matters more than the &quot;right&quot; answer.</p>
            <div className="options-grid mt-8">
              {NOT_READY_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswer(option)}
                  className={`option-button ${state.answers[8] === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      // Q9: Biggest fear
      case 9:
        return (
          <div key="q9" className="question-container" style={{ animation: `${animClass} 0.4s ease-out` }}>
            <h2 className="question-title">What scares you the most?</h2>
            <p className="question-subtitle">The fear you name is the fear you can face.</p>
            <div className="options-grid mt-8">
              {FEAR_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setAnswer(option)}
                  className={`option-button ${state.answers[9] === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FDF8F4" }}>
      {/* Header */}
      <header className="px-6 pt-6 pb-2">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPrev}
              className={`p-2 rounded-full transition-all duration-300 ${
                state.currentQuestion === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              style={{ backgroundColor: "#E8DDD520" }}
              aria-label="Go back"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8B7B6B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <span
              className="text-sm tracking-wider"
              style={{
                color: "#8B7B6B",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {state.currentQuestion + 1} of {total}
            </span>

            <div className="w-9" />
          </div>

          {/* Progress bar */}
          <div
            className="w-full h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "#E8DDD5" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #C4725A, #D4956B)",
              }}
            />
          </div>
        </div>
      </header>

      {/* Question Area */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-lg w-full">{renderQuestion()}</div>
      </main>

      {/* Global Styles */}
      <style jsx>{`
        .question-container {
          text-align: center;
        }

        .question-title {
          font-family: "Georgia", serif;
          font-size: 1.6rem;
          font-weight: 400;
          line-height: 1.35;
          color: #3d2b1f;
          margin-bottom: 0.75rem;
        }

        .question-subtitle {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: #8b7b6b;
          line-height: 1.6;
          max-width: 400px;
          margin: 0 auto;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 420px;
          margin-left: auto;
          margin-right: auto;
        }

        .option-button {
          width: 100%;
          padding: 16px 24px;
          border-radius: 16px;
          border: 2px solid #e8ddd5;
          background: white;
          color: #3d2b1f;
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease;
          line-height: 1.4;
        }

        .option-button:hover {
          border-color: #c4725a;
          background: #fdf2ed;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(196, 114, 90, 0.12);
        }

        .option-button:active {
          transform: translateY(0);
        }

        .option-button.selected {
          border-color: #c4725a;
          background: #c4725a;
          color: white;
        }

        .next-button {
          padding: 14px 40px;
          border-radius: 50px;
          border: none;
          background: #c4725a;
          color: white;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .next-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(196, 114, 90, 0.3);
        }

        .anxiety-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(
            90deg,
            #e8ddd5 0%,
            #c4725a 100%
          );
          outline: none;
        }

        .anxiety-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #c4725a;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 2px 8px rgba(196, 114, 90, 0.35);
          transition: transform 0.2s ease;
        }

        .anxiety-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .anxiety-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #c4725a;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 2px 8px rgba(196, 114, 90, 0.35);
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
