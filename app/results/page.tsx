'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, TrendingDown, Calendar, Heart, Lock } from 'lucide-react';
import { type FertilityResults } from '@/lib/quizLogic';

function ResultsContent() {
  const searchParams = useSearchParams();
  const resultsData = searchParams.get('data');
  
  if (!resultsData) {
    return <div>No results found</div>;
  }

  const results: FertilityResults = JSON.parse(decodeURIComponent(resultsData));

  const TimelineVisualization = () => {
    const currentAge = results.currentAge;
    const timelineYears = 20;
    const startAge = Math.max(18, currentAge - 5);
    const endAge = startAge + timelineYears;

    return (
      <div className="relative">
        <div className="flex justify-between text-sm text-zinc-400 mb-2">
          <span>{startAge}</span>
          <span className="text-rose-400 font-bold">Current: {currentAge}</span>
          <span>{endAge}</span>
        </div>
        
        <div className="relative h-16 bg-zinc-900 rounded-lg overflow-hidden">
          {/* Peak fertility zone */}
          <div
            className="absolute top-0 h-full bg-emerald-500/20"
            style={{
              left: `${((Math.max(startAge, 25) - startAge) / timelineYears) * 100}%`,
              width: `${((Math.min(32, endAge) - Math.max(startAge, 25)) / timelineYears) * 100}%`,
            }}
          />
          
          {/* Declining fertility zone */}
          <div
            className="absolute top-0 h-full bg-amber-500/20"
            style={{
              left: `${((Math.max(startAge, 32) - startAge) / timelineYears) * 100}%`,
              width: `${((Math.min(results.fertilityDeclineAge, endAge) - Math.max(startAge, 32)) / timelineYears) * 100}%`,
            }}
          />
          
          {/* Rapid decline zone */}
          <div
            className="absolute top-0 h-full bg-red-500/20"
            style={{
              left: `${((Math.max(startAge, results.fertilityDeclineAge) - startAge) / timelineYears) * 100}%`,
              width: `${((Math.min(results.estimatedMenopauseAge, endAge) - Math.max(startAge, results.fertilityDeclineAge)) / timelineYears) * 100}%`,
            }}
          />
          
          {/* Current age marker */}
          <div
            className="absolute top-0 h-full w-1 bg-rose-500"
            style={{
              left: `${((currentAge - startAge) / timelineYears) * 100}%`,
            }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-rose-400 whitespace-nowrap">
              You are here
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded" />
            <span>Peak Fertility</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded" />
            <span>Declining</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded" />
            <span>Rapid Decline</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Your Personalized Fertility Timeline
          </h1>
          <p className="text-xl text-zinc-400">
            Based on your unique genetic and lifestyle factors
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
            <h2 className="text-2xl font-bold text-rose-400">Your Timeline</h2>
            <TimelineVisualization />
            
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">
                  {results.yearsUntilDecline}
                </div>
                <p className="text-sm text-zinc-400">Years until fertility decline</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">
                  {results.fertilityDeclineAge}
                </div>
                <p className="text-sm text-zinc-400">Predicted decline age</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  {results.estimatedMenopauseAge}
                </div>
                <p className="text-sm text-zinc-400">Estimated menopause</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {results.redFlags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-red-950/20 border-red-900/50 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-red-400" />
                <h2 className="text-2xl font-bold text-red-400">Important Considerations</h2>
              </div>
              <ul className="space-y-3">
                {results.redFlags.map((flag, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <TrendingDown className="h-5 w-5 text-red-400 mt-0.5" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-400" />
              <h3 className="text-xl font-bold">How You Compare</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Women your age with kids</span>
                  <span className="text-sm font-bold">{results.peerComparison.withKids}%</span>
                </div>
                <Progress value={results.peerComparison.withKids} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Planning within 2 years</span>
                  <span className="text-sm font-bold">{results.peerComparison.planningKids}%</span>
                </div>
                <Progress value={results.peerComparison.planningKids} className="h-2" />
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-rose-400" />
              <h3 className="text-xl font-bold">Recommended Actions</h3>
            </div>
            <ul className="space-y-2 text-sm">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-rose-400 rounded-full mt-1.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-rose-950/30 to-zinc-900 border-rose-900/50 p-8 text-center space-y-6 overflow-hidden">
            <div className="absolute top-4 right-4">
              <Lock className="h-8 w-8 text-rose-400/50" />
            </div>
            
            <h2 className="text-3xl font-bold">Get Your Complete Fertility Report</h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              Unlock personalized strategies, month-by-month action plans, and expert guidance tailored to your unique situation
            </p>
            
            <div className="space-y-4">
              <div className="text-4xl font-bold text-rose-400">
                $29.99
                <span className="text-lg font-normal text-zinc-400 line-through ml-2">$49.99</span>
              </div>
              
              <Button
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white px-12 py-6 text-lg"
              >
                Unlock Full Report
              </Button>
              
              <p className="text-sm text-zinc-500">
                Instant access • Science-backed • 30-day guarantee
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-zinc-800">
              <div>
                <div className="font-bold">15-page report</div>
                <div className="text-sm text-zinc-400">Detailed analysis</div>
              </div>
              <div>
                <div className="font-bold">Action timeline</div>
                <div className="text-sm text-zinc-400">Month-by-month guide</div>
              </div>
              <div>
                <div className="font-bold">Partner talk guide</div>
                <div className="text-sm text-zinc-400">Conversation scripts</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="text-zinc-50">Loading...</div></div>}>
      <ResultsContent />
    </Suspense>
  );
}
