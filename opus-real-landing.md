```tsx
'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageCircle, TrendingUp, Clock, Heart, ChevronDown } from 'lucide-react'

export default function FertilityTimelinePage() {
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])
  const floatingShapeY1 = useTransform(scrollY, [0, 1000], [0, -150])
  const floatingShapeY2 = useTransform(scrollY, [0, 1000], [0, -100])

  const redditPosts = [
    {
      upvotes: 1738,
      subreddit: "r/relationships",
      title: "My husband's (38M) increasing franticness about having kids is making me (33F) not want them at all",
      excerpt: "When we first got together, we were both pretty neutral on the topic of kids...Any conversations we've had about the future, marriage, kids etc have always been initiated by me..."
    },
    {
      upvotes: 7368,
      subreddit: "r/relationship_advice",
      title: "My ex-Wife (F38) and I (M38) divorced because I was infertile and unwilling to use a sperm donor",
      excerpt: "My ex-wife is a complete girly-girl who loves children and always wanted a big family. She is a primary-school teacher...We started trying when we were both 28..."
    },
    {
      upvotes: 1448,
      subreddit: "r/relationships",
      title: "I (32F) found out getting pregnant could kill me but all my SO of 6 years (33M) wants is a family",
      excerpt: "Any conversations we've had about the future, marriage, kids etc have always been initiated by me...Max and I have been together 6 years, lived together for 4..."
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] via-[#FAF8F3] to-[#F7F5F0] overflow-hidden">
      {/* Floating background shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: floatingShapeY1 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: floatingShapeY2 }}
          className="absolute top-96 -left-40 w-80 h-80 bg-gradient-to-br from-sage-200/20 to-emerald-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: backgroundY }}
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-['Cormorant_Garamond'] text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9] text-stone-900 mb-6">
              Is he wasting
              <span className="block italic text-rose-700/80">your time?</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-stone-600 font-light mb-12 max-w-2xl mx-auto"
          >
            You deserve clarity about your future. Not vague promises.
            Not "maybe next year." Real answers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -15px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-medium text-lg shadow-xl transition-all duration-300"
            >
              Discover Your Timeline
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <p className="text-sm text-stone-500 mb-4">Based on analysis of</p>
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-3xl font-light text-stone-900">1,054</p>
                <p className="text-sm text-stone-600">relationship posts</p>
              </div>
              <div className="w-px h-12 bg-stone-300" />
              <div>
                <p className="text-3xl font-light text-stone-900">ACOG</p>
                <p className="text-sm text-stone-600">fertility data</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-stone-400" />
          </motion.div>
        </div>
      </motion.section>

      {/* Real Voices Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-stone-900 mb-4">
              Women are talking about this
            </h2>
            <p className="text-lg text-stone-600">Real conversations. Real concerns. Real upvotes.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {redditPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.08)" }}
                  className="bg-white rounded-2xl p-8 shadow-lg h-full transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 text-orange-600">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-semibold">{post.upvotes.toLocaleString()}</span>
                    </div>
                    <span className="text-stone-500 text-sm">{post.subreddit}</span>
                  </div>
                  <h3 className="font-medium text-lg text-stone-900 mb-3 line-clamp-3">
                    "{post.title}"
                  </h3>
                  <p className="text-stone-600 text-sm italic line-clamp-3">
                    {post.excerpt}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Reality Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-rose-50/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-stone-900 mb-6">
              The conversation that's
              <span className="block italic text-rose-700/80">harder than it should be</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
                <h3 className="font-semibold text-xl text-stone-900 mb-3">What research tells us</h3>
                <p className="text-stone-600">
                  According to ACOG, fertility begins to decline in your early 30s. 
                  By 35, that decline accelerates. Yet most couples don't have honest 
                  timeline conversations until it feels urgent.
                </p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
                <h3 className="font-semibold text-xl text-stone-900 mb-3">The waiting game</h3>
                <p className="text-stone-600">
                  Study after study shows: pregnancy timelines vary by up to 37 days 
                  even in healthy pregnancies. But relationship timelines? Those can 
                  stretch for years without clarity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center"
            >
              <div className="bg-gradient-to-br from-rose-100/50 to-pink-100/50 rounded-3xl p-12 text-center">
                <Heart className="w-16 h-16 text-rose-600 mx-auto mb-6" />
                <p className="text-2xl font-light text-stone-900 mb-4">
                  Most women don't know their timeline until it feels too late
                </p>
                <p className="text-stone-600">
                  You deserve to make informed decisions about your future. 
                  Not based on hope. Based on clarity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-stone-900 mb-4">
              Simple. Private. Empowering.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageCircle, title: "Answer honestly", desc: "Quick questions about your relationship status and family goals. No judgment, just clarity." },
              { icon: Clock, title: "Get your timeline", desc: "See personalized insights based on fertility research and relationship patterns." },
              { icon: Heart, title: "Start the conversation", desc: "Use our guides to have the talk that changes everything. With confidence." }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10 text-emerald-700" />
                  </div>
                  <h3 className="font-semibold text-xl text-stone-900 mb-3">{step.title}</h3>
                  <p className="text-stone-600">{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-emerald-50/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-stone-900 mb-8">
              Your time is
              <span className="italic text-emerald-700"> precious</span>
            </h2>
            <p className="text-xl text-stone-600 mb-12 max-w-2xl mx-auto">
              Every month matters. Every conversation counts. You're not being pushy 
              by wanting clarity about your future. You're being smart.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -15px rgb(0 0 0 / 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-medium text-lg shadow-xl transition-all duration-300"
              >
                Discover Your Timeline
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <p className="text-sm text-stone-500 mt-8">
              Takes 3 minutes. No email required to start.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
```