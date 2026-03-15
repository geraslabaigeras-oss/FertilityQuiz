"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowUp, Shield, Clock, BarChart3, AlertTriangle, Lightbulb } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
    },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#FAF8F5",
        color: "#2C2C2C",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16 lg:px-24"
      >
        <span
          className="text-2xl tracking-wide"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 500,
            color: "#2C2C2C",
            letterSpacing: "0.08em",
          }}
        >
          Claira
        </span>
        <div className="hidden sm:flex items-center gap-1 text-xs tracking-wide opacity-40">
          <Shield className="w-3 h-3" />
          <span>100% Anonymous</span>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.p
            custom={0}
            variants={fadeIn}
            className="text-xs uppercase tracking-[0.3em] mb-8 opacity-50"
            style={{ fontFamily: "-apple-system, sans-serif" }}
          >
            Fertility Timeline Assessment
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeIn}
            className="text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-8"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Am I Wasting
            <br />
            My Fertile Years?
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeIn}
            className="text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed"
            style={{
              color: "#5A5A5A",
              fontWeight: 300,
            }}
          >
            Get your personalized fertility timeline in 2 minutes
          </motion.p>

          <motion.div custom={3} variants={fadeIn}>
            <Button
              onClick={() => router.push("/quiz")}
              className="rounded-full px-10 py-7 text-base tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "#E07A5F",
                color: "#FAF8F5",
                fontFamily: "-apple-system, sans-serif",
                fontWeight: 400,
                letterSpacing: "0.04em",
                border: "none",
                boxShadow: "0 4px 24px rgba(224, 122, 95, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C96A52";
                e.currentTarget.style.boxShadow = "0 6px 32px rgba(224, 122, 95, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#E07A5F";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(224, 122, 95, 0.25)";
              }}
            >
              Get Your Fertility Timeline
            </Button>
          </motion.div>

          <motion.p
            custom={4}
            variants={fadeIn}
            className="mt-5 text-sm opacity-40"
          >
            Takes 2 minutes · 100% anonymous
          </motion.p>
        </motion.div>
      </section>

      {/* Thin decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        className="mx-auto w-16 h-px"
        style={{ backgroundColor: "#E07A5F", opacity: 0.4 }}
      />

      {/* Reddit Quote Section */}
      <section className="relative z-10 px-6 py-20 md:py-28 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-2xl mx-auto"
        >
          <motion.p
            custom={0}
            variants={fadeIn}
            className="text-xs uppercase tracking-[0.25em] mb-10 text-center opacity-40"
          >
            Why women are asking
          </motion.p>

          <motion.div custom={1} variants={fadeIn}>
            <Card
              className="border-0 p-8 md:p-12 lg:p-14"
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 40px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)",
                borderRadius: "16px",
              }}
            >
              {/* Reddit badge */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: "#FF4500" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4" style={{ color: "#FF4500" }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#FF4500" }}
                  >
                    13,631
                  </span>
                </div>
              </div>

              {/* Quote */}
              <blockquote
                className="text-xl md:text-2xl leading-relaxed mb-8"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#2C2C2C",
                  lineHeight: 1.55,
                }}
              >
                &ldquo;(UPDATE): My MIL exposed my (28f) past group-assault to
                my husband (34m). Who had no idea. Wants him to divorce me.
                Please help me.&rdquo;
              </blockquote>

              {/* Source */}
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-4 rounded-full"
                  style={{ backgroundColor: "#E07A5F", opacity: 0.6 }}
                />
                <span className="text-sm opacity-50">
                  r/relationship_advice
                </span>
              </div>
            </Card>
          </motion.div>

          <motion.p
            custom={2}
            variants={fadeIn}
            className="text-center mt-8 text-sm leading-relaxed max-w-md mx-auto"
            style={{ color: "#8A8A8A" }}
          >
            Thousands of women share these fears every day.
            <br />
            Most never get a clear answer.
          </motion.p>
        </motion.div>
      </section>

      {/* Social Proof Strip */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeIn}
        custom={0}
        className="relative z-10 px-6 py-12"
      >
        <div
          className="max-w-2xl mx-auto rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          style={{
            backgroundColor: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <p
            className="text-sm text-center sm:text-left"
            style={{ color: "#2C2C2C" }}
          >
            <span
              className="font-semibold"
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.15rem" }}
            >
              12,847
            </span>{" "}
            <span className="opacity-60">women have gotten their timeline</span>
          </p>
          <div className="hidden sm:block w-px h-5 bg-black/10" />
          <div className="flex items-center gap-5 text-xs opacity-50">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              100% Anonymous
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              Research-backed
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              2 minutes
            </span>
          </div>
        </div>
      </motion.section>

      {/* Value Props */}
      <section className="relative z-10 px-6 py-20 md:py-28 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          <motion.p
            custom={0}
            variants={fadeIn}
            className="text-xs uppercase tracking-[0.25em] mb-16 text-center opacity-40"
          >
            What you&apos;ll discover
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {[
              {
                icon: <BarChart3 className="w-6 h-6" />,
                headline: "See Your Window",
                text: "Visual timeline showing your fertility potential year by year",
              },
              {
                icon: <AlertTriangle className="w-6 h-6" />,
                headline: "Spot Red Flags",
                text: "Compare your relationship timeline to 500+ women who faced this decision",
              },
              {
                icon: <Lightbulb className="w-6 h-6" />,
                headline: "Get Real Answers",
                text: "No fake testimonials. Just research and data from women like you.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeIn}
                className="text-center md:text-left"
              >
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                  style={{
                    backgroundColor: "rgba(224, 122, 95, 0.08)",
                    color: "#E07A5F",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-xl mb-3"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 500,
                    fontSize: "1.4rem",
                  }}
                >
                  {item.headline}
                </h3>
                <p
                    className="text-sm leading-relaxed mx-auto md:mx-0"
                  style={{ color: "#7A7A7A", maxWidth: "280px" }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Decorative separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        className="mx-auto w-16 h-px"
        style={{ backgroundColor: "#E07A5F", opacity: 0.4 }}
      />

      {/* Bottom CTA Section */}
      <section className="relative z-10 px-6 py-24 md:py-32 lg:py-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-xl mx-auto text-center"
        >
          <motion.h2
            custom={0}
            variants={fadeIn}
            className="text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 400,
            }}
          >
            Your timeline is ticking.
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeIn}
            className="text-3xl md:text-4xl lg:text-5xl mb-10 leading-tight"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#E07A5F",
            }}
          >
            Know where you stand.
          </motion.p>

          <motion.div custom={2} variants={fadeIn}>
            <Button
              onClick={() => router.push("/quiz")}
              className="rounded-full px-12 py-8 text-base tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "#E07A5F",
                color: "#FAF8F5",
                fontFamily: "-apple-system, sans-serif",
                fontWeight: 400,
                letterSpacing: "0.04em",
                border: "none",
                boxShadow: "0 4px 24px rgba(224, 122, 95, 0.25)",
                fontSize: "1.05rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C96A52";
                e.currentTarget.style.boxShadow = "0 8px 40px rgba(224, 122, 95, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#E07A5F";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(224, 122, 95, 0.25)";
              }}
            >
              Get Your Fertility Timeline
            </Button>
          </motion.div>

          <motion.p
            custom={3}
            variants={fadeIn}
            className="mt-5 text-sm opacity-40"
          >
            Takes 2 minutes · 100% anonymous
          </motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 py-12 md:py-16"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs uppercase tracking-[0.2em] opacity-30">
              Featured on
            </p>
            <div className="flex items-center gap-6">
              {[
                "r/relationships",
                "r/TwoXChromosomes",
                "r/relationship_advice",
              ].map((sub) => (
                <div
                  key={sub}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.03)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#FF4500"
                    opacity={0.5}
                  >
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                  <span className="text-xs opacity-40">{sub}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <span
                className="text-lg tracking-wide opacity-30"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                }}
              >
                Claira
              </span>
              <p className="text-xs opacity-25">
                © {new Date().getFullYear()} Claira. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Google Fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap");

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::selection {
          background-color: rgba(224, 122, 95, 0.2);
          color: #2c2c2c;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
