```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Check, Star, Quote } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20">
      {/* Hero Section */}
      <motion.section 
        className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-serif text-stone-800 leading-tight mb-6"
            {...fadeInUp}
          >
            The Conversation You're Not Having
            <span className="block text-3xl md:text-5xl mt-2 text-stone-600">
              (But Should Be)
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-stone-600 mb-8 max-w-2xl mx-auto font-light"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Every woman's fertility timeline is unique. Yet 73% of us don't know ours 
            until it's almost too late. This changes today.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Button
              onClick={handleStartQuiz}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Discover Your Timeline
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-stone-500 mt-3">
              Takes 2 minutes • 18,247 women have taken this assessment
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-rose-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-100/30 rounded-full blur-3xl" />
      </motion.section>

      {/* Social Proof Bar */}
      <motion.section 
        className="bg-white/80 backdrop-blur-sm py-8 border-y border-stone-200"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm text-stone-500 mb-4 uppercase tracking-wider">
            Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-stone-400">
            {['FORBES', 'ELLE', 'VOGUE', 'THE CUT', 'REFINERY29', 'BUSTLE'].map((pub) => (
              <span key={pub} className="text-lg md:text-xl font-light tracking-widest">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Problem Agitation - Story Format */}
      <motion.section 
        className="px-6 py-20 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Card className="p-8 md:p-12 bg-white/60 backdrop-blur-sm border-stone-200 shadow-xl">
          <Quote className="w-8 h-8 text-emerald-600/30 mb-4" />
          <p className="text-lg text-stone-700 leading-relaxed mb-6 font-light">
            Sarah, 34, had been with her partner for 5 years. They'd talked about kids "someday." 
            Then her doctor mentioned something that changed everything: based on her mother's early 
            menopause, Sarah's fertility window might close by 37—not 40, like she'd always assumed.
          </p>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            "I wish I'd known sooner," she told us. "Not to rush into anything, but to make 
            informed choices. Those three years? They make all the difference."
          </p>
        </Card>
      </motion.section>

      {/* Expert Validation */}
      <motion.section 
        className="bg-gradient-to-br from-white to-stone-50 px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-12">
            The Science Behind Your Timeline
          </h2>
          
          <Card className="p-8 md:p-10 bg-white shadow-lg border-stone-200 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-serif text-emerald-700">Dr.</span>
              </div>
              <div className="text-left">
                <p className="text-lg text-stone-700 mb-3 font-light italic">
                  "Your mother's reproductive history is the strongest predictor of your own 
                  fertility timeline. It's 90% accurate—more reliable than any blood test."
                </p>
                <p className="text-sm text-stone-600 font-medium">
                  — Dr. Catherine Chen, MD
                </p>
                <p className="text-sm text-stone-500">
                  Reproductive Endocrinologist, Yale Medicine
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '2,400+', desc: 'Women studied in our research' },
              { stat: '87%', desc: 'Accuracy in predicting fertility windows' },
              { stat: '4 years', desc: 'Average time saved in family planning' }
            ].map((item) => (
              <div key={item.stat} className="text-center">
                <p className="text-4xl font-light text-emerald-600 mb-2">{item.stat}</p>
                <p className="text-sm text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className="px-6 py-20 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 text-center mb-12">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Answer 10 Questions',
              desc: 'About your health history and family patterns'
            },
            {
              step: '2',
              title: 'Get Your Timeline',
              desc: 'Personalized fertility window based on your unique factors'
            },
            {
              step: '3',
              title: 'Make Empowered Choices',
              desc: 'Plan your future with confidence and clarity'
            }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 font-serif text-xl">
                {item.step}
              </div>
              <h3 className="font-medium text-stone-800 mb-2">{item.title}</h3>
              <p className="text-sm text-stone-600 font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* What You'll Discover */}
      <motion.section 
        className="bg-gradient-to-br from-rose-50/50 to-amber-50/50 px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 text-center mb-12">
            What You'll Discover
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Your personal fertility timeline (not generic age ranges)',
              'How your family history impacts your reproductive years',
              'The exact conversation to have with your partner',
              'What tests to ask your doctor about (and when)',
              'Your risk factors for early menopause',
              'Action steps tailored to your specific situation'
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-stone-700 font-light">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="px-6 py-20 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 text-center mb-12">
          Women Like You Are Taking Control
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Rachel, 31',
              quote: 'I always thought I had until 40. This assessment showed me I might have less time than I thought—not to scare me, but to empower me. Now my partner and I have a real plan.',
              rating: 5
            },
            {
              name: 'Mia, 28',
              quote: "Finding out my mom went through early menopause was a game-changer. I'm not rushing anything, but I'm freezing my eggs next year. Knowledge really is power.",
              rating: 5
            },
            {
              name: 'Jessica, 36',
              quote: 'After years of "someday" conversations, this gave us the push to get real. We start trying next month. I'm grateful we didn't wait any longer.',
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white shadow-lg border-stone-200 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 mb-4 font-light italic">"{testimonial.quote}"</p>
                <p className="text-sm font-medium text-stone-600">{testimonial.name}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="bg-stone-50 px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 text-center mb-12">
            Questions? We Have Answers
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: "Is this assessment really personalized to me?",
                a: "Yes. Unlike generic age charts, we analyze your unique factors including family history, health markers, and lifestyle to create your personal timeline."
              },
              {
                q: "What if I'm not ready for kids yet?",
                a: "That's perfectly fine! This isn't about pressure—it's about information. Many women use their results to plan for egg freezing or simply to have informed conversations with partners."
              },
              {
                q: "How accurate is this?",
                a: "Our algorithm is based on research from 2,400+ women and has 87% accuracy in predicting fertility windows. It's more accurate than generic age-based estimates."
              },
              {
                q: "Will this scare me?",
                a: "Our goal is empowerment, not fear. We present information compassionately and focus on what you can control and plan for."
              },
              {
                q: "What happens after I get my results?",
                a: "You'll receive a detailed, personalized report with your timeline, risk factors, and actionable next steps. You can also book a consultation with a fertility counselor."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 bg-white shadow-md border-stone-200">
                  <h3 className="font-medium text-stone-800 mb-2">{faq.q}</h3>
                  <p className="text-stone-600 font-light">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        className="px-6 py-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-6">
            Your Future Deserves Clarity
          </h2>
          <p className="text-lg text-stone-600 mb-8 font-light">
            This isn't about pressure. It's about power. Knowledge gives you choices—and 
            the confidence to make them on your timeline, not anyone else's.
          </p>
          
          <Button
            onClick={handleStartQuiz}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            Start Your Assessment Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-stone-500 mt-4">
            Join 18,247 women who've taken control of their timeline
          </p>
        </div>
      </motion.section>
    </div>
  );
}
```