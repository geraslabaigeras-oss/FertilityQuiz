'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import QuizProgress from '@/components/QuizProgress';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { calculateFertilityTimeline, type QuizAnswers } from '@/lib/quizLogic';

const questions = [
  {
    id: 'age',
    type: 'number',
    question: 'How old are you?',
    subtext: 'Your current age helps us understand your fertility window',
    min: 18,
    max: 50,
  },
  {
    id: 'relationshipStatus',
    type: 'radio',
    question: 'What\'s your current relationship status?',
    subtext: 'This helps us tailor your timeline',
    options: [
      { value: 'single', label: 'Single' },
      { value: 'dating', label: 'Dating' },
      { value: 'committed', label: 'In a committed relationship' },
      { value: 'engaged', label: 'Engaged' },
      { value: 'married', label: 'Married' },
    ],
  },
  {
    id: 'relationshipLength',
    type: 'number',
    question: 'How long have you been together?',
    subtext: 'Enter in years (use decimals for months, e.g., 0.5 for 6 months)',
    min: 0,
    max: 30,
    conditional: (answers: Partial<QuizAnswers>) => 
      answers.relationshipStatus !== 'single',
  },
  {
    id: 'discussedKids',
    type: 'radio',
    question: 'Have you discussed having kids with your partner?',
    options: [
      { value: 'yes', label: 'Yes, we\'ve talked about it' },
      { value: 'no', label: 'No, not yet' },
      { value: 'na', label: 'Not applicable' },
    ],
    conditional: (answers: Partial<QuizAnswers>) => 
      answers.relationshipStatus !== 'single',
  },
  {
    id: 'partnerWantsKids',
    type: 'radio',
    question: 'Does your partner want kids?',
    options: [
      { value: 'yes', label: 'Yes, definitely' },
      { value: 'no', label: 'No, they don\'t' },
      { value: 'unsure', label: 'They\'re unsure' },
      { value: 'na', label: 'Not applicable' },
    ],
    conditional: (answers: Partial<QuizAnswers>) => 
      answers.relationshipStatus !== 'single',
  },
  {
    id: 'anxietyLevel',
    type: 'slider',
    question: 'How anxious are you about your fertility timeline?',
    subtext: '1 = Not at all, 10 = Extremely anxious',
    min: 1,
    max: 10,
  },
  {
    id: 'motherFirstChildAge',
    type: 'number',
    question: 'How old was your mother when she had her first child?',
    subtext: 'Family history is a strong predictor of fertility patterns',
    min: 15,
    max: 50,
  },
  {
    id: 'motherMenopauseAge',
    type: 'number',
    question: 'At what age did your mother experience menopause?',
    subtext: 'This is 90% accurate in predicting your own timeline',
    min: 35,
    max: 65,
  },
  {
    id: 'familyFertilityIssues',
    type: 'radio',
    question: 'Are there any known fertility issues in your family?',
    subtext: 'Including PCOS, endometriosis, early menopause, etc.',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'unsure', label: 'I\'m not sure' },
    ],
  },
  {
    id: 'biggestConcern',
    type: 'radio',
    question: 'What\'s your biggest concern right now?',
    options: [
      { value: 'time', label: 'Running out of time' },
      { value: 'partner', label: 'Partner not being ready' },
      { value: 'career', label: 'Career priorities' },
      { value: 'financial', label: 'Financial stability' },
      { value: 'unsure', label: 'Not sure if I want kids' },
    ],
  },
];

const insights = [
  {
    afterQuestion: 3,
    title: 'Did you know?',
    content: 'Women who discuss kids by year 2 of their relationship have an 82% chance of getting married within 5 years.',
    icon: '💍',
  },
  {
    afterQuestion: 6,
    title: 'Fertility fact',
    content: 'Your fertility peaks at 32 and drops by 35% after age 35. But remember, every woman\'s journey is unique!',
    icon: '📊',
  },
  {
    afterQuestion: 8,
    title: 'Genetic insight',
    content: '90% of women experience menopause within 5 years of their mother\'s age - making it our most accurate predictor.',
    icon: '🧬',
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showInsight, setShowInsight] = useState(false);
  const [error, setError] = useState('');

  const activeQuestions = questions.filter(q => 
    !q.conditional || q.conditional(answers)
  );

  const currentQ = activeQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / activeQuestions.length) * 100;

  const currentInsight = insights.find(i => 
    i.afterQuestion === currentQuestion && !showInsight
  );

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [currentQ.id as keyof QuizAnswers]: value }));
    setError('');
  };

  const validateAnswer = () => {
    const value = answers[currentQ.id as keyof QuizAnswers];
    
    if (value === undefined || value === null) {
      setError('Please provide an answer to continue');
      return false;
    }

    if (currentQ.type === 'number') {
      const num = Number(value);
      if (isNaN(num) || num < currentQ.min! || num > currentQ.max!) {
        setError(`Please enter a number between ${currentQ.min} and ${currentQ.max}`);
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateAnswer()) return;

    if (currentInsight && !showInsight) {
      setShowInsight(true);
      return;
    }

    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowInsight(false);
    } else {
      // Quiz complete, navigate to results
      const results = calculateFertilityTimeline(answers as QuizAnswers);
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(results))}`);
    }
  };

  const handleBack = () => {
    if (showInsight) {
      setShowInsight(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      <QuizProgress progress={progress} currentQuestion={currentQuestion + 1} totalQuestions={activeQuestions.length} />
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {showInsight && currentInsight ? (
              <motion.div
                key="insight"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center space-y-6"
              >
                <div className="text-6xl mb-4">{currentInsight.icon}</div>
                <h2 className="text-3xl font-bold text-rose-400">
                  {currentInsight.title}
                </h2>
                <p className="text-xl text-zinc-300 max-w-md mx-auto">
                  {currentInsight.content}
                </p>
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="mt-8 bg-rose-500 hover:bg-rose-600 text-white px-8"
                >
                  Continue <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {currentQ.question}
                  </h2>
                  {currentQ.subtext && (
                    <p className="text-zinc-400 text-lg">{currentQ.subtext}</p>
                  )}
                </div>

                <div className="space-y-6">
                  {currentQ.type === 'number' && (
                    <div className="max-w-xs mx-auto">
                      <Input
                        type="number"
                        min={currentQ.min}
                        max={currentQ.max}
                        value={answers[currentQ.id as keyof QuizAnswers] as string || ''}
                        onChange={(e) => handleAnswer(e.target.value)}
                        className="bg-zinc-900 border-zinc-800 text-zinc-50 text-center text-2xl h-16"
                        placeholder="Enter a number"
                      />
                    </div>
                  )}

                  {currentQ.type === 'radio' && (
                    <RadioGroup
                      value={answers[currentQ.id as keyof QuizAnswers] as string || ''}
                      onValueChange={handleAnswer}
                      className="space-y-3 max-w-md mx-auto"
                    >
                      {currentQ.options!.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3 p-4 rounded-lg border border-zinc-800 hover:border-rose-500 transition-colors cursor-pointer"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="border-zinc-600 text-rose-500"
                          />
                          <Label
                            htmlFor={option.value}
                            className="text-lg cursor-pointer flex-1"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {currentQ.type === 'slider' && (
                    <div className="max-w-md mx-auto space-y-4">
                      <div className="flex justify-between text-sm text-zinc-400">
                        <span>{currentQ.min}</span>
                        <span className="text-2xl font-bold text-rose-400">
                          {answers[currentQ.id as keyof QuizAnswers] as number || 5}
                        </span>
                        <span>{currentQ.max}</span>
                      </div>
                      <Slider
                        value={[(answers[currentQ.id as keyof QuizAnswers] as number) || 5]}
                        onValueChange={(value) => handleAnswer(Array.isArray(value) ? value[0] : value)}
                        min={currentQ.min}
                        max={currentQ.max}
                        step={1}
                        className="[&_[role=slider]]:bg-rose-500"
                      />
                    </div>
                  )}
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex justify-between items-center pt-8">
                  <Button
                    onClick={handleBack}
                    variant="ghost"
                    size="lg"
                    disabled={currentQuestion === 0}
                    className="text-zinc-400 hover:text-zinc-50"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>

                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="bg-rose-500 hover:bg-rose-600 text-white px-8"
                  >
                    {currentQuestion === activeQuestions.length - 1 ? 'See Results' : 'Next'}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
