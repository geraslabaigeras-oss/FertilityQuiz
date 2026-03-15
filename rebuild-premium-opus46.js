#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });
const reddit = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

(async () => {
  console.log('🎨 Building ACTUALLY PREMIUM Claira with Opus 4.6...\n');
  
  // === LANDING PAGE ===
  console.log('1/3 Building landing...');
  const landingPrompt = `You are a world-class conversion-focused designer building a landing page for Claira, a fertility timeline quiz targeting women 25-45 in relationships worried about their biological clock.

CRITICAL CONTEXT:
- This targets EMOTIONAL pain: fear of running out of time, partner uncertainty, relationship limbo
- It needs to feel TRUSTWORTHY - like editorial content, not a scammy quiz
- Reference successful quiz funnels like Relatio app (clean, modern, professional)
- Real Reddit quote from women in this situation: "${reddit[0].title}" (${reddit[0].score} upvotes)

BUILD app/page.tsx with PREMIUM DESIGN:

HERO SECTION:
- Small elegant serif logo "Claira" (cream/ivory color, not bright purple)
- Headline: "Am I Wasting My Fertile Years?" (large, elegant serif, charcoal/dark)
- Subhead: "Get your personalized fertility timeline based on your age, relationship, and family history"
- Real Reddit quote in a subtle card (cream background, italic text, orange Reddit icon with upvote count)
- NOT stock photos, NO fake testimonials

SOCIAL PROOF (subtle):
- "12,847 women have taken this" (small, understated)
- Trust badges in a row: "100% Anonymous" • "2 minutes" • "Research-backed"
- Featured on: r/relationships, r/TwoXChromosomes (subtle badges)

BENEFITS (3 columns, CLEAR VALUE):
- 💫 See your exact fertile window
- 🚩 Identify relationship red flags
- 📊 Compare to real data from 500+ women

CTA:
- Large, confident button: "Get My Fertility Timeline"
- NOT purple/pink gradients - use elegant deep plum or warm terracotta
- Button should feel premium, not gamified

DESIGN SYSTEM:
- Colors: cream (#FAF8F5), ivory, warm terracotta (#E07A5F), deep plum (#3D2645), charcoal text
- Typography: Elegant serif headlines (Cormorant Garamond), clean sans body
- White space: GENEROUS - let it breathe
- Cards: subtle shadows, cream backgrounds, NOT white
- NO floating blob shapes - use subtle texture or nothing
- Animations: SUBTLE fade-ins, no bouncing

The vibe: Luxury women's editorial (like The Cut, Refinery29), NOT SaaS landing page.

Generate COMPLETE Next.js TypeScript code with "use client", router, Framer Motion, shadcn components.`;

  const landingMsg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: landingPrompt }]
  });
  
  const landingCode = landingMsg.content[0].text.match(/```(?:tsx|typescript)?\s*\n([\s\S]*?)```/)?.[1] || landingMsg.content[0].text;
  fs.writeFileSync('app/page.tsx', landingCode);
  console.log('✅ app/page.tsx\n');
  
  // === QUIZ PAGE ===
  console.log('2/3 Building quiz...');
  const quizPrompt = `Build an elegant quiz experience for app/quiz/page.tsx.

DESIGN PHILOSOPHY:
- Clean, focused, ONE question at a time
- NO clutter - just the question and options
- Progress should be clear but not overwhelming
- Insights should feel like editorial facts, not pop-ups

STRUCTURE:
- Top: Minimal header with "Claira" logo + "Question 3 of 10" (right aligned)
- Thin progress bar (terracotta color filling in)
- Large question text (elegant serif, centered)
- Options as large, clean buttons (cream background, hover: slight terracotta border)
- For number inputs: large, simple input field

10 QUESTIONS:
1. How old are you? (number)
2. Relationship status? (Single / Dating / Serious / Married) → AFTER: "62% discuss planning within 2 years"
3. How long together? (options)
4. Discussed kids? (options) → AFTER: "73% less likely if avoided 3+ years"
5. Partner wants kids? (options)
6. Anxiety 1-10? (number)
7. Mother's first child? (options) → AFTER: "90% menopause within 5 years of mother"
8. Mother's menopause? (options)
9. Family issues? (options)
10. Biggest concern? (options)

INSIGHTS:
- Show after Q2, Q4, Q7
- Simple card, cream background, terracotta accent
- Fade in, stay 3 seconds, fade out
- Auto-proceed to next question

COLORS: cream, terracotta, charcoal text
TYPOGRAPHY: Serif headlines, sans body
NO purple/pink, NO gradients

After Q10: router.push with answers encoded.

Complete TypeScript code.`;

  const quizMsg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: quizPrompt }]
  });
  
  const quizCode = quizMsg.content[0].text.match(/```(?:tsx|typescript)?\s*\n([\s\S]*?)```/)?.[1] || quizMsg.content[0].text;
  fs.writeFileSync('app/quiz/page.tsx', quizCode);
  console.log('✅ app/quiz/page.tsx\n');
  
  // === RESULTS PAGE ===
  console.log('3/3 Building results...');
  const resultsPrompt = `Build results page app/results/page.tsx with VISUAL excellence and smart paywall.

FREE PREVIEW:
- "Your Fertility Timeline" (elegant serif headline)
- ACTUAL CHART (not text blocks):
  * Clean line chart showing fertility probability from 25-50
  * Minimal design - thin lines, subtle colors
  * Zones: Green (optimal), amber (good), red (declining)
  * User's age marked with vertical line
  * Should look like NYT/WSJ data viz, NOT colorful infographic
  
- 3 summary cards (grid):
  * Optimal window (green accent)
  * Good window (amber accent)
  * Declining window (red accent)
  * Clean, minimal design

- One insight card:
  * Based on their answers
  * Cream background, terracotta accent
  * Real statistic (73% less likely...)

PAYWALL:
- Clear visual break (subtle line or spacing)
- Heading: "Unlock Your Complete Analysis"
- List what's inside (6 items with checkmarks):
  * How you compare to 500+ women
  * Red flags in your timeline
  * Action plan with specific dates
  * Real stories from women
  * Fertility clinic finder
  * Egg freezing cost calculator

- BLURRED preview (show a report card but blur it)
- Email input (elegant, simple)
- Pricing: $49.99 crossed → $29.99 (NOT huge, tasteful)
- Button: "Get My Full Report" (terracotta, elegant)
- Social proof: "247 unlocked today" + stars (subtle)

DESIGN:
- Cream backgrounds, terracotta accents
- Elegant serif headlines
- GENEROUS white space
- NO purple/pink gradients
- Should feel like premium editorial content

Complete TypeScript with useSearchParams (wrap in Suspense), Framer Motion, all imports.`;

  const resultsMsg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: resultsPrompt }]
  });
  
  const resultsCode = resultsMsg.content[0].text.match(/```(?:tsx|typescript)?\s*\n([\s\S]*?)```/)?.[1] || resultsMsg.content[0].text;
  fs.writeFileSync('app/results/page.tsx', resultsCode);
  console.log('✅ app/results/page.tsx\n');
  
  console.log('✨ DONE! Premium editorial design by Opus 4.6');
  console.log('Run: npm run build');
})();
