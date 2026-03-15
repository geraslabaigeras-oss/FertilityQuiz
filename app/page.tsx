'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-32">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
              </span>
              <span className="text-zinc-400">Trusted by 18,000+ women</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-center font-serif text-5xl font-light leading-tight text-zinc-50 md:text-7xl lg:text-8xl"
          >
            Am I <span className="italic text-rose-400">Wasting</span>
            <br />
            My Fertile Years?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-12 max-w-3xl text-center text-xl text-zinc-400 md:text-2xl"
          >
            Get your personalized fertility timeline based on{' '}
            <span className="font-semibold text-rose-400">real data</span> from 2,400+ women like you.
            <br />
            <span className="text-lg text-zinc-500">Know what happens next.</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="group h-14 gap-2 rounded-full bg-rose-500 px-8 text-lg font-semibold text-white shadow-xl shadow-rose-500/30 hover:bg-rose-600 hover:shadow-2xl hover:shadow-rose-500/40"
            >
              Take the 2-Minute Assessment
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Takes 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Science-backed data</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>100% private</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-zinc-800 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-serif text-4xl font-light text-zinc-50 md:text-5xl">
              The Data Doesn't Lie
            </h2>
            <p className="text-lg text-zinc-400">
              We analyzed thousands of real stories to give you the truth nobody talks about
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '2,400+', label: "Women's Stories", desc: 'Analyzed from forums & surveys' },
              { value: '68%', label: 'Regret Waiting', desc: 'Of women over 35' },
              { value: '4 years', label: 'Average Wait', desc: "Before 'the conversation'" },
              { value: '35%', label: 'Decline After 35', desc: 'Natural conception rate' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm hover:bg-zinc-900/80 transition-colors"
              >
                <div className="mb-3 font-serif text-5xl font-bold text-rose-400">{stat.value}</div>
                <div className="mb-2 text-lg font-semibold text-zinc-300">{stat.label}</div>
                <div className="text-sm text-zinc-500">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
