"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lock, Clock, FlaskConical, ChevronUp } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2C2C] selection:bg-[#E07A5F]/20">
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto"
      >
        <h1
          className="text-2xl tracking-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Claira
        </h1>
        <span className="text-xs tracking-widest uppercase text-[#2C2C2C]/40 font-medium">
          Fertility Intelligence
        </span>
      </motion.nav>

      <main className="max-w-2xl mx-auto px-6 pb-24">
        {/* Hero */}
        <section className="pt-12 pb-16 text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xs tracking-[0.25em] uppercase text-[#E07A5F] font-medium mb-6"
          >
            The quiz women are whispering about
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl leading-[1.15] font-normal mb-6"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Am I Wasting
            <br />
            My Fertile Years?
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-[#2C2C2C]/60 max-w-md mx-auto leading-relaxed"
          >
            Get a personalized fertility timeline based on your age, lifestyle,
            and relationship&mdash;so you can stop guessing and start planning.
          </motion.p>
        </section>

        {/* Reddit Quote Card */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Card className="bg-white border border-[#2C2C2C]/8 shadow-sm rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#FF4500] flex items-center justify-center">
                <span className="text-white text-xs font-bold">r/</span>
              </div>
              <span className="text-sm text-[#2C2C2C]/50 font-medium">
                r/relationships
              </span>
              <span className="text-xs text-[#2C2C2C]/30 ml-auto">
                14h ago
              </span>
            </div>

            <p
              className="text-[15px] leading-relaxed text-[#2C2C2C]/80 mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              &ldquo;(UPDATE): My MIL exposed my (28f) past group-assault to my
              husband (34m). Who had no idea. Wants him to divorce me. Please
              help me.&rdquo;
            </p>

            <div className="flex items-center gap-4 text-sm text-[#2C2C2C]/40">
              <div className="flex items-center gap-1">
                <ChevronUp className="w-4 h-4 text-[#E07A5F]" />
                <span className="font-medium text-[#E07A5F]">13,631</span>
              </div>
              <span>2,847 comments</span>
            </div>
          </Card>
        </motion.div>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center text-sm text-[#2C2C2C]/35 mb-16"
        >
          12,847 women took this quiz this week
        </motion.p>

        {/* Benefits */}
        <motion.section
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid gap-6 mb-16"
        >
          {[
            {
              emoji: "💫",
              title: "Your Personal Fertility Window",
              desc: "See exactly where you stand based on science—not anxiety.",
            },
            {
              emoji: "📊",
              title: "Data-Driven Timeline",
              desc: "Factors like AMH decline, egg quality, and lifestyle mapped to your age.",
            },
            {
              emoji: "🚩",
              title: "Red Flags You're Ignoring",
              desc: "The relationship & health signals most women overlook until it's too late.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="text-2xl mt-0.5">{item.emoji}</span>
              <div>
                <h3
                  className="text-base font-medium mb-1"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#2C2C2C]/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.section>

        {/* CTA */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <Button
            onClick={() => router.push("/quiz")}
            className="bg-[#E07A5F] hover:bg-[#c96a52] text-white text-base font-medium px-10 py-7 rounded-full shadow-lg shadow-[#E07A5F]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#E07A5F]/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get My Fertility Timeline
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-[#2C2C2C]/30 mt-4">
            Free &middot; No email required &middot; Results in 2 minutes
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          custom={7}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-6 mb-16"
        >
          {[
            { icon: Lock, label: "100% Anonymous" },
            { icon: Clock, label: "Takes 2 min" },
            { icon: FlaskConical, label: "Research-backed" },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-[#2C2C2C]/40"
            >
              <badge.icon className="w-4 h-4" />
              <span>{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Featured */}
        <motion.div
          custom={8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-[#2C2C2C]/25 mb-4">
            Discussed in
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-[#2C2C2C]/35">
            <span className="font-medium">r/relationships</span>
            <span className="w-1 h-1 rounded-full bg-[#2C2C2C]/15" />
            <span className="font-medium">r/TwoXChromosomes</span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2C2C2C]/5 py-8 text-center">
        <p className="text-xs text-[#2C2C2C]/25">
          &copy; 2025 Claira. Not medical advice. For informational purposes
          only.
        </p>
      </footer>
    </div>
  );
}
