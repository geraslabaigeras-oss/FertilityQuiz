"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  text: string;
  type: "number" | "options";
  options?: string[];
  placeholder?: string;
  insight?: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How old are you?",
    type: "number",
    placeholder: "Enter your age",
  },
  {
    id: 2,
    text: "What is your relationship status?",
    type: "options",
    options: ["Single", "Dating", "In a serious relationship", "Married"],
    insight: "62% of couples discuss family planning within the first 2 years together.",
  },
  {
    id: 3,
    text: "How long have you been with your partner?",
    type: "options",
    options: [
      "I'm not in a relationship",
      "Less than 1 year",
      "1–3 years",
      "3–5 years",
      "More than 5 years",
    ],
  },
  {
    id: 4,
    text: "Have you and your partner discussed having children?",
    type: "options",
    options: [
      "Yes, in detail",
      "Briefly mentioned it",
      "Not yet",
      "We avoid the topic",
      "Not applicable",
    ],
    insight: "Couples who avoid discussing children for 3+ years are 73% less likely to align on family goals.",
  },
  {
    id: 5,
    text: "Does your partner want children?",
    type: "options",
    options: [
      "Yes, definitely",
      "Leaning towards yes",
      "Unsure",
      "Leaning towards no",
      "No",
      "Not applicable",
    ],
  },
  {
    id: 6,
    text: "On a scale of 1 to 10, how much anxiety do you feel about your fertility timeline?",
    type: "number",
    placeholder: "1 (none) to 10 (extreme)",
  },
  {
    id: 7,
    text: "At what age did your mother have her first child?",
    type: "options",
    options: [
      "Under 20",
      "20–25",
      "26–30",
      "31–35",
      "Over 35",
      "I don't know",
    ],
    insight: "Research shows 90% of women experience menopause within 5 years of their mother's age at menopause.",
  },
  {
    id: 8,
    text: "At what age did your mother reach menopause?",
    type: "options",
    options: [
      "Before 45",
      "45–50",
      "51–55",
      "After 55",
      "I don't know",
    ],
  },
  {
    id: 9,
    text: "Are there any known fertility issues in your family?",
    type: "options",
    options: [
      "Yes",
      "No",
      "I'm not sure",
      "Prefer not to say",
    ],
  },
  {
    id: 10,
    text: "What is your biggest concern right now?",
    type: "options",
    options: [
      "Running out of time",
      "Not having the right partner",
      "Financial readiness",
      "Career timing",
      "Health concerns",
      "I'm not sure yet",
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [numberInput, setNumberInput] = useState("");
  const [showInsight, setShowInsight] = useState(false);
  const [insightVisible, setInsightVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questionVisible, setQuestionVisible] = useState(true);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const proceedToNext = useCallback(() => {
    if (currentIndex >= questions.length - 1) {
      const encoded = encodeURIComponent(JSON.stringify(answers));
      router.push(`/results?answers=${encoded}`);
      return;
    }

    setQuestionVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setNumberInput("");
      setSelectedOption(null);
      setTimeout(() => {
        setQuestionVisible(true);
      }, 50);
    }, 300);
  }, [currentIndex, answers, router]);

  const showInsightThenProceed = useCallback(() => {
    setShowInsight(true);
    setTimeout(() => setInsightVisible(true), 50);
    setTimeout(() => {
      setInsightVisible(false);
      setTimeout(() => {
        setShowInsight(false);
        proceedToNext();
      }, 500);
    }, 3500);
  }, [proceedToNext]);

  const handleAnswer = useCallback(
    (answer: string) => {
      const newAnswers = { ...answers, [currentQuestion.id]: answer };
      setAnswers(newAnswers);

      if (currentQuestion.insight) {
        showInsightThenProceed();
      } else {
        proceedToNext();
      }
    },
    [answers, currentQuestion, showInsightThenProceed, proceedToNext]
  );

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setTimeout(() => handleAnswer(option), 400);
  };

  const handleNumberSubmit = () => {
    const val = numberInput.trim();
    if (!val) return;

    if (currentQuestion.id === 1) {
      const age = parseInt(val);
      if (isNaN(age) || age < 13 || age > 65) return;
    }
    if (currentQuestion.id === 6) {
      const score = parseInt(val);
      if (isNaN(score) || score < 1 || score > 10) return;
    }

    handleAnswer(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNumberSubmit();
    }
  };

  // Auto-focus number input
  useEffect(() => {
    if (currentQuestion.type === "number" && questionVisible) {
      const timer = setTimeout(() => {
        const input = document.getElementById("number-input");
        input?.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentQuestion.type, questionVisible]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF7F2",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 40px 16px",
          maxWidth: 800,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: 24,
            fontWeight: 400,
            color: "#2D2A26",
            letterSpacing: "-0.02em",
          }}
        >
          Claira
        </span>
        <span
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: 14,
            color: "#8A8580",
            letterSpacing: "0.02em",
          }}
        >
          Question {currentIndex + 1} of {questions.length}
        </span>
      </header>

      {/* Progress Bar */}
      <div
        style={{
          maxWidth: 800,
          width: "100%",
          margin: "0 auto",
          padding: "0 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            height: 3,
            backgroundColor: "#E8E3DC",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "#C4684A",
              borderRadius: 2,
              transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 40px 80px",
          maxWidth: 640,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Insight Overlay */}
        {showInsight && currentQuestion.insight && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              zIndex: 10,
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: "40px 36px",
                maxWidth: 480,
                width: "100%",
                borderLeft: "3px solid #C4684A",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                opacity: insightVisible ? 1 : 0,
                transform: insightVisible
                  ? "translateY(0)"
                  : "translateY(12px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <p
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.12em",
                  color: "#C4684A",
                  margin: "0 0 14px",
                }}
              >
                Did you know?
              </p>
              <p
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: 19,
                  lineHeight: 1.6,
                  color: "#2D2A26",
                  margin: 0,
                }}
              >
                {currentQuestion.insight}
              </p>
            </div>
          </div>
        )}

        {/* Question Content */}
        <div
          style={{
            width: "100%",
            opacity: showInsight ? 0 : questionVisible ? 1 : 0,
            transform: showInsight
              ? "translateY(-12px)"
              : questionVisible
              ? "translateY(0)"
              : "translateY(12px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: showInsight ? "none" : "auto",
          }}
        >
          {/* Question Text */}
          <h1
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: 32,
              fontWeight: 400,
              color: "#2D2A26",
              textAlign: "center" as const,
              lineHeight: 1.4,
              margin: "0 0 48px",
              letterSpacing: "-0.01em",
            }}
          >
            {currentQuestion.text}
          </h1>

          {/* Options */}
          {currentQuestion.type === "options" && currentQuestion.options && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
              }}
            >
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedOption !== null}
                  style={{
                    width: "100%",
                    padding: "18px 24px",
                    backgroundColor:
                      selectedOption === option ? "#FFF8F5" : "#FFFFFF",
                    border:
                      selectedOption === option
                        ? "1.5px solid #C4684A"
                        : "1.5px solid #E8E3DC",
                    borderRadius: 10,
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: 16,
                    color: "#2D2A26",
                    cursor: selectedOption ? "default" : "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "left" as const,
                    outline: "none",
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedOption) {
                      (e.target as HTMLButtonElement).style.borderColor =
                        "#C4684A";
                      (e.target as HTMLButtonElement).style.backgroundColor =
                        "#FFF8F5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedOption || selectedOption !== option) {
                      (e.target as HTMLButtonElement).style.borderColor =
                        selectedOption === option ? "#C4684A" : "#E8E3DC";
                      (e.target as HTMLButtonElement).style.backgroundColor =
                        selectedOption === option ? "#FFF8F5" : "#FFFFFF";
                    }
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Number Input */}
          {currentQuestion.type === "number" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
                width: "100%",
              }}
            >
              <input
                id="number-input"
                type="number"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={currentQuestion.placeholder}
                style={{
                  width: "100%",
                  maxWidth: 320,
                  padding: "20px 24px",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #E8E3DC",
                  borderRadius: 10,
                  fontFamily:
                    "'Georgia', 'Times New Roman', serif",
                  fontSize: 24,
                  color: "#2D2A26",
                  textAlign: "center" as const,
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  appearance: "none" as const,
                  MozAppearance: "textfield" as const,
                  WebkitAppearance: "none" as const,
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#C4684A";
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "#E8E3DC";
                }}
              />
              <button
                onClick={handleNumberSubmit}
                disabled={!numberInput.trim()}
                style={{
                  padding: "16px 48px",
                  backgroundColor: numberInput.trim()
                    ? "#C4684A"
                    : "#E8E3DC",
                  border: "none",
                  borderRadius: 10,
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: numberInput.trim() ? "#FFFFFF" : "#B5B0AA",
                  cursor: numberInput.trim() ? "pointer" : "default",
                  transition: "all 0.2s ease",
                  outline: "none",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  if (numberInput.trim()) {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      "#B35D42";
                  }
                }}
                onMouseLeave={(e) => {
                  if (numberInput.trim()) {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      "#C4684A";
                  }
                }}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Hide number input spinners */}
      <style>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        ::placeholder {
          color: #C4C0BA;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
