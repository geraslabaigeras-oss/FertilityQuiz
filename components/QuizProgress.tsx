'use client';

import { motion } from 'framer-motion';

interface QuizProgressProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuizProgress({ 
  progress, 
  currentQuestion, 
  totalQuestions 
}: QuizProgressProps) {
  return (
    <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-semibold text-rose-400">
            Fertility Assessment
          </h1>
          <span className="text-sm text-zinc-400">
            Question {currentQuestion} of {totalQuestions}
          </span>
        </div>
        
        <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-500 to-rose-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
