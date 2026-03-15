"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FDF8F4]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div
          className="text-[28px] tracking-[0.04em] text-[#3D2E2E]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Claira
        </div>
        <button
          onClick={() => router.push("/quiz")}
          className="text-[13px] tracking-[0.08em] uppercase text-[#3D2E2E] border border-[#3D2E2E]/30 px-5 py-2.5 rounded-full hover:bg-[#3D2E2E] hover:text-[#FDF8F4] transition-all duration-300"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          Take the Quiz
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pt-16 md:pt-24 lg:pt-32 pb-20 md:pb-32">
        <div className="max-w-[820px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-[#C4725A]" />
            <span
              className="text-[12px] tracking-[0.16em] uppercase text-[#C4725A]"
              style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
            >
              The 2-Minute Reality Check
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] text-[#3D2E2E] mb-6"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Is He Wasting
            <br />
            Your Time?
          </h1>

          {/* Subheadline */}
          <p
            className="text-[18px] md:text-[21px] leading-[1.6] text-[#3D2E2E]/70 max-w-[560px] mb-12"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 300 }}
          >
            Find out if your relationship timeline adds up&thinsp;—&thinsp;before
            it&rsquo;s too late.
          </p>

          {/* CTA */}
          <button
            onClick={() => router.push("/quiz")}
            className="group relative bg-[#C4725A] text-white px-10 py-4.5 rounded-full text-[15px] tracking-[0.06em] hover:bg-[#B5634C] transition-all duration-300 shadow-[0_4px_24px_rgba(196,114,90,0.3)] hover:shadow-[0_6px_32px_rgba(196,114,90,0.4)]"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            Find Out If I&rsquo;m Wasting Time
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>

          <p
            className="mt-4 text-[13px] text-[#3D2E2E]/45 tracking-[0.02em]"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            Takes 2 minutes&ensp;•&ensp;100% anonymous
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="h-[1px] bg-[#3D2E2E]/10" />
      </div>

      {/* Reddit Quote — The Gut Punch */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-20 md:py-28">
        <div className="max-w-[780px] mx-auto">
          {/* Label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C4725A]/20 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#C4725A]" />
            </div>
            <span
              className="text-[11px] tracking-[0.18em] uppercase text-[#3D2E2E]/40"
              style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
            >
              Why women are searching for answers
            </span>
          </div>

          {/* The Quote Card */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_2px_40px_rgba(61,46,46,0.06)] border border-[#3D2E2E]/[0.04]">
            {/* Reddit-style header */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-5 rounded-full bg-[#FF4500]/10 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF4500">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.71c.147.325.22.676.22 1.04 0 2.654-3.1 4.81-6.916 4.81-3.817 0-6.917-2.156-6.917-4.81 0-.37.076-.726.226-1.054-.672-.488-1.109-1.27-1.109-2.156 0-1.468 1.19-2.66 2.66-2.66.72 0 1.37.287 1.85.753C9.618 8.832 10.78 8.4 12.07 8.4c1.29 0 2.452.432 3.89 1.233.48-.466 1.13-.753 1.85-.753 1.47 0 2.66 1.192 2.66 2.66 0 .886-.437 1.668-1.109 2.156z" />
                </svg>
              </div>
              <span
                className="text-[12px] text-[#3D2E2E]/40"
                style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
              >
                r/relationship_advice
              </span>
            </div>

            {/* Quote Text */}
            <blockquote
              className="text-[20px] md:text-[24px] leading-[1.55] text-[#3D2E2E] mb-8"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              &ldquo;We&rsquo;ve been together 4 years. I&rsquo;m 31. Every time I
              bring up kids he says &lsquo;not yet.&rsquo; My doctor told me my
              fertility is already declining. I love him but I&rsquo;m terrified
              I&rsquo;m going to wake up at 37 and realize I gave my best years to
              someone who was never going to be ready.&rdquo;
            </blockquote>

            {/* Engagement Stats */}
            <div className="flex items-center gap-4 text-[13px] text-[#3D2E2E]/35" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                <span>13,631</span>
              </div>
              <span>•</span>
              <span>847 comments</span>
              <span>•</span>
              <span>Posted 3 days ago</span>
            </div>
          </div>

          {/* Below quote — the reframe */}
          <p
            className="mt-10 text-center text-[16px] md:text-[17px] leading-[1.7] text-[#3D2E2E]/55 max-w-[520px] mx-auto"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 300 }}
          >
            Thousands of women are asking the same question.
            <br />
            <span className="text-[#3D2E2E]/80 font-normal">
              We built a tool that actually answers it.
            </span>
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="h-[1px] bg-[#3D2E2E]/10" />
      </div>

      {/* Value Props */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-20 md:py-28">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-[1px] bg-[#C4725A]" />
          <span
            className="text-[12px] tracking-[0.16em] uppercase text-[#C4725A]"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            What you&rsquo;ll discover
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {/* Prop 1 */}
          <div className="group">
            <div className="text-[36px] mb-5">🚩</div>
            <h3
              className="text-[22px] md:text-[24px] text-[#3D2E2E] mb-4 leading-[1.3]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              See the Red Flags
            </h3>
            <p
              className="text-[15px] leading-[1.7] text-[#3D2E2E]/55"
              style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 300 }}
            >
              Compare your relationship timeline to 500+ women. Learn what
              actually predicts breakups vs. babies&thinsp;—&thinsp;based on real
              outcomes, not guesses.
            </p>
          </div>

          {/* Prop 2 */}
          <div className="group">
            <div className="text-[36px] mb-5">⏰</div>
            <h3
              className="text-[22px] md:text-[24px] text-[#3D2E2E] mb-4 leading-[1.3]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Your Reality Check
            </h3>
            <p
              className="text-[15px] leading-[1.7] text-[#3D2E2E]/55"
              style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 300 }}
            >
              See how much time you realistically have&thinsp;—&thinsp;and what
              that means for <em>this</em> relationship. Not scare tactics. Just
              math.
            </p>
          </div>

          {/* Prop 3 */}
          <div className="group">
            <div className="text-[36px] mb-5">💬</div>
            <h3
              className="text-[22px] md:text-[24px] text-[#3D2E2E] mb-4 leading-[1.3]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Stories Like Yours
            </h3>
            <p
              className="text-[15px] leading-[1.7] text-[#3D2E2E]/55"
              style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 300 }}
            >
              Read what happened to women who waited vs. women who didn&rsquo;t.
              Real stories. Real outcomes. So you can decide with clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="h-[1px] bg-[#3D2E2E]/10" />
      </div>

      {/* Social Proof / Trust */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-20 md:py-24">
        <div className="max-w-[680px] mx-auto text-center">
          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-14">
            <div>
              <div
                className="text-[36px] md:text-[44px] text-[#3D2E2E]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                500+
              </div>
              <div
                className="text-[12px] tracking-[0.12em] uppercase text-[#3D2E2E]/40 mt-1"
                style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
              >
                Women surveyed
              </div>
            </div>
            <div>
              <div
                className="text-[36px] md:text-[44px] text-[#3D2E2E]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                2 min
              </div>
              <div
                className="text-[12px] tracking-[0.12em] uppercase text-[#3D2E2E]/40 mt-1"
                style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
              >
                To complete
              </div>
            </div>
            <div>
              <div
                className="text-[36px] md:text-[44px] text-[#3D2E2E]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                100%
              </div>
              <div
                className="text-[12px] tracking-[0.12em] uppercase text-[#3D2E2E]/40 mt-1"
                style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
              >
                Anonymous
              </div>
            </div>
          </div>

          {/* Featured In */}
          <div className="flex items-center justify-center gap-6 text-[12px] tracking-[0.1em] text-[#3D2E2E]/30 uppercase" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            <span>Built from conversations on</span>
            <div className="flex items-center gap-1.5 text-[#3D2E2E]/50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.5">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.71c.147.325.22.676.22 1.04 0 2.654-3.1 4.81-6.916 4.81-3.817 0-6.917-2.156-6.917-4.81 0-.37.076-.726.226-1.054-.672-.488-1.109-1.27-1.109-2.156 0-1.468 1.19-2.66 2.66-2.66.72 0 1.37.287 1.85.753C9.618 8.832 10.78 8.4 12.07 8.4c1.29 0 2.452.432 3.89 1.233.48-.466 1.13-.753 1.85-.753 1.47 0 2.66 1.192 2.66 2.66 0 .886-.437 1.668-1.109 2.156z" />
              </svg>
              <span>r/relationships</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-[#3D2E2E]/50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.5">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.71c.147.325.22.676.22 1.04 0 2.654-3.1 4.81-6.916 4.81-3.817 0-6.917-2.156-6.917-4.81 0-.37.076-.726.226-1.054-.672-.488-1.109-1.27-1.109-2.156 0-1.468 1.19-2.66 2.66-2.66.72 0 1.37.287 1.85.753C9.618 8.832 10.78 8.4 12.07 8.4c1.29 0 2.452.432 3.89 1.233.48-.466 1.13-.753 1.85-.753 1.47 0 2.66 1.192 2.66 2.66 0 .886-.437 1.668-1.109 2.156z" />
              </svg>
              <span>r/relationship_advice</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="h-[1px] bg-[#3D2E2E]/10" />
      </div>

      {/* Testimonial Snippets */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-20 md:py-28">
        <div className="max-w-[820px] mx-auto">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-8 h-[1px] bg-[#C4725A]" />
            <span
              className="text-[12px] tracking-[0.16em] uppercase text-[#C4725A]"
              style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
            >
              Sound familiar?
            </span>
          </div>

          <div className="space-y-8">
            {[
              {
                quote:
                  "He says he wants kids 'someday' but won't give me a year. I'm turning 32 next month. I need to know if I should stay or go.",
                age: "31",
                years: "3 years together",
              },
              {
                quote:
                  "My friends all have babies now. He told me to 'stop pressuring him.' But I'm not pressuring—I'm planning. There's a difference.",
                age: "29",
                years: "5 years together",
              },
              {
                quote:
                  "I froze my eggs last year because I couldn't get a straight answer from him. That should tell you everything.",
                age: "34",
                years: "4 years together",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/60 rounded-xl p-7 md:p-8 border border-[#3D2E2E]/[0.04]"
              >
                <p
                  className="text-[16px] md:text-[17px] leading-[1.65] text-[#3D2E2E]/75 mb-5"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div
                  className="text-[12px] tracking-[0.08em] text-[#3D2E2E]/35"
                  style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
                >
                  Age {item.age}&ensp;•&ensp;{item.years}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pb-28 md:pb-36">
        <div className="max-w-[680px] mx-auto text-center">
          {/* Horizontal rule */}
          <div className="w-12 h-[1px] bg-[#C4725A]/40 mx-auto mb-14" />

          <h2
            className="text-[32px] md:text-[42px] lg:text-[48px] leading-[1.15] text-[#3D2E2E] mb-6"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            You deserve an answer.
          </h2>

          <p
            className="text-[17px] md:text-[18px] leading-[1.65] text-[#3D2E2E]/55 mb-10 max-w-[480px] mx-auto"
            style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 300,
            }}
          >
            Not &ldquo;someday.&rdquo; Not &ldquo;we&rsquo;ll see.&rdquo; A real,
            data-backed picture of where your relationship stands.
          </p>

          <button
            onClick={() => router.push("/quiz")}
            className="group relative bg-[#C4725A] text-white px-12 py-5 rounded-full text-[16px] tracking-[0.04em] hover:bg-[#B5634C] transition-all duration-300 shadow-[0_4px_24px_rgba(196,114,90,0.3)] hover:shadow-[0_8px_40px_rgba(196,114,90,0.4)]"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            Find Out If I&rsquo;m Wasting Time
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>

          <p
            className="mt-5 text-[13px] text-[#3D2E2E]/40 tracking-[0.02em]"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            Anonymous&ensp;•&ensp;2 minutes&ensp;•&ensp;Based on real data from
            500+ women
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3D2E2E]/[0.06] px-6 md:px-12 lg:px-20 py-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="text-[20px] tracking-[0.04em] text-[#3D2E2E]/40"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Claira
          </div>
          <div
            className="flex items-center gap-6 text-[12px] text-[#3D2E2E]/30"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            <span>© 2025</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
