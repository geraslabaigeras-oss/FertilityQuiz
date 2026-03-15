'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Lock } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e]">
      {/* Floating background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-violet-500/8 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Small floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-purple-400/20"
          style={{
            top: `${15 + i * 15}%`,
            left: `${10 + i * 14}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-12 flex flex-col items-center min-h-screen">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1
            className="text-3xl tracking-[0.3em] text-white/90"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Claira
          </h1>
          <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Am I Wasting My
          <br />
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">
            Fertile Years?
          </span>
        </motion.h2>

        {/* Reddit quote card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 w-full"
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            {/* Subtle glow behind card */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-xl" />

            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/80">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-white" fill="currentColor">
                  <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm5 11h-4v4H9v-4H5V9h4V5h2v4h4v2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-white/40">r/relationship_advice</span>
            </div>

            <p className="text-sm leading-relaxed text-white/70 italic">
              &ldquo;(UPDATE): My MIL exposed my (28f) past group-assault to my husband (34m). Who
              had no idea. Wants him to divorce me. Please help me.&rdquo;
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <svg
                  className="h-4 w-4 text-orange-400/70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 17l-1.45-1.32C3.4 11.36 0 8.28 0 4.5 0 1.42 2.42 0 5 0c1.74 0 3.41.81 4.5 2.09C10.59.81 12.26 0 14 0 17.58 0 20 2.42 20 4.5c0 3.78-3.4 6.86-8.55 11.18L10 17z"
                  />
                </svg>
                <span className="text-xs font-semibold text-orange-400/70">13,631 upvotes</span>
              </div>
              <span className="text-xs text-white/30">•</span>
              <span className="text-xs text-white/30">Real post. Real pain.</span>
            </div>
          </div>
        </motion.div>

        {/* Social proof counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex items-center gap-2"
        >
          <div className="flex -space-x-2">
            {[
              'bg-gradient-to-br from-purple-400 to-pink-400',
              'bg-gradient-to-br from-pink-400 to-rose-400',
              'bg-gradient-to-br from-violet-400 to-purple-400',
              'bg-gradient-to-br from-rose-400 to-pink-300',
            ].map((gradient, i) => (
              <div
                key={i}
                className={`h-7 w-7 rounded-full ${gradient} border-2 border-[#1a0a2e] flex items-center justify-center`}
              >
                <span className="text-[10px] text-white/80">
                  {['👩', '👩‍🦰', '👩‍🦱', '👩‍🦳'][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/50">
            <span className="font-semibold text-white/70">12,847</span> women took this quiz
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 grid w-full gap-4 sm:grid-cols-3"
        >
          {[
            {
              emoji: '💫',
              title: 'Clarity in 2 Minutes',
              desc: 'Understand your fertility timeline with science-backed insights',
            },
            {
              emoji: '🚩',
              title: 'Spot Red Flags',
              desc: 'Identify relationship patterns that waste your prime years',
            },
            {
              emoji: '📊',
              title: 'Personal Report',
              desc: 'Get a customized action plan based on your unique situation',
            },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="group rounded-xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-purple-400/20 hover:bg-white/8"
            >
              <span className="text-2xl">{benefit.emoji}</span>
              <h3 className="mt-2 text-sm font-semibold text-white/90">{benefit.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/40">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 w-full flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-md"
          >
            <Button
              onClick={() => router.push('/quiz')}
              className="relative w-full h-16 rounded-2xl text-lg font-semibold text-white shadow-2xl shadow-purple-500/25 transition-all hover:shadow-purple-500/40 border-0 overflow-hidden group cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #D946EF, #EC4899)',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
              />
              <span className="relative z-10">Take the Free Quiz →</span>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-3 text-xs text-white/30"
          >
            No signup required • Free forever
          </motion.p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { icon: Lock, label: '100% Anonymous' },
            { icon: Clock, label: 'Takes 2 minutes' },
            { icon: Shield, label: 'Data never sold' },
          ].map((trust, i) => (
            <div key={i} className="flex items-center gap-2">
              <trust.icon className="h-4 w-4 text-purple-400/60" />
              <span className="text-xs text-white/40">{trust.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom spacer and subtle footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-auto pt-16 pb-8 text-center"
        >
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
          <p className="text-[11px] text-white/20">
            This quiz is for informational purposes only and is not medical advice.
          </p>
          <p className="mt-1 text-[11px] text-white/20">
            © {new Date().getFullYear()} Claira. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
