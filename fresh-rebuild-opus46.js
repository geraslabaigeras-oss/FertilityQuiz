#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });
const reddit = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

async function buildFile(name, prompt) {
  console.log(`Building ${name}...`);
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }]
  });
  
  const text = msg.content[0].text;
  fs.writeFileSync(`${name}-raw.txt`, text); // Save raw response
  
  // Extract code block
  const match = text.match(/```(?:tsx|typescript|jsx|js)?\s*\n([\s\S]*?)```/);
  if (match) {
    return match[1];
  }
  
  // If no code block, maybe it's just raw code
  return text;
}

(async () => {
  console.log('🎨 FRESH REBUILD with Claude Opus 4.6\n');
  
  // === 1. LANDING PAGE ===
  const landing = await buildFile('landing', `Build a stunning landing page for Claira fertility quiz.

REQUIREMENTS:
- File: app/page.tsx for Next.js 14 App Router
- "use client" at top
- Imports: motion from framer-motion, Button from @/components/ui/button, Card from @/components/ui/card, useRouter from next/navigation, Shield/Clock/Star icons from lucide-react
- Claira logo: elegant serif "Claira" (Cormorant Garamond style with inline style tag)
- Headline: "Am I Wasting My Fertile Years?"
- Real Reddit quote: "${reddit[0].title}" with ${reddit[0].score} upvotes shown
- "12,847 women have taken this quiz"
- 3 benefits with emojis: 💫 Personalized timeline, 🚩 Red flag detection, 📊 Real data insights
- Big gradient purple/pink button "START YOUR FREE ASSESSMENT" that calls router.push('/quiz')
- Trust badges: Shield icon "100% Anonymous", Clock icon "2 minutes"
- Featured on badges: r/relationships, r/TwoXChromosomes (pill style)
- Background: gradient from-purple-50 via-pink-50 to-purple-50
- Floating decorative shapes (absolute positioned divs with blur)
- All elements fade in with Framer Motion (stagger delays 0.2s each)
- Purple/pink theme, white cards with backdrop-blur
- TypeScript, Tailwind CSS

Generate COMPLETE working code.`);
  
  fs.writeFileSync('app/page.tsx', landing);
  console.log('✅ app/page.tsx\n');
  
  // === 2. QUIZ PAGE ===
  const quiz = await buildFile('quiz', `Build an interactive quiz page for Claira.

REQUIREMENTS:
- File: app/quiz/page.tsx
- "use client"
- 10 questions stored in const array:
  1. "How old are you?" (number input)
  2. "What's your relationship status?" (4 options: Single, Dating, Serious relationship, Married) - AFTER: show insight "62% of women in serious relationships discuss family planning within 2 years"
  3. "How long together?" (5 options: <6mo, 6mo-1yr, 1-2yr, 3-5yr, 5+yr)
  4. "Discussed having kids?" (5 options) - AFTER: show insight "Partners who avoid this for 3+ years: 73% less likely to have kids together"
  5. "Partner wants kids?" (5 options)
  6. "Anxiety about fertility 1-10?" (number input)
  7. "Mother's first child age?" (6 options) - AFTER: show insight "90% of women experience menopause within 5 years of their mother"
  8. "Mother's menopause age?" (5 options)
  9. "Family fertility issues?" (4 options)
  10. "Biggest concern?" (5 options)

FLOW:
- Show Claira logo + "Question X of 10" at top
- Animated progress bar (purple gradient, width based on current question)
- Each question slides in from right (Framer Motion)
- For number inputs: Input component
- For options: clickable Card buttons with hover scale effect
- When option selected: border turns purple, bg purple-50
- After Q2, Q4, Q7: show purple insight Card at bottom for 3 seconds, then auto-proceed to next
- After Q10: router.push(\`/results?data=\${encodeURIComponent(JSON.stringify(answers))}\`)
- Use useState for currentQuestion, answers, showInsight
- Purple/pink theme consistent with landing

Generate COMPLETE working code with all imports.`);
  
  fs.writeFileSync('app/quiz/page.tsx', quiz);
  console.log('✅ app/quiz/page.tsx\n');
  
  // === 3. RESULTS PAGE ===
  const results = await buildFile('results', `Build a results page with visual timeline and paywall for Claira.

REQUIREMENTS:
- File: app/results/page.tsx
- "use client"
- Imports: useSearchParams, useState, useEffect, Suspense from react, motion from framer-motion, Button/Card/Input from shadcn, Lock/CheckCircle2/Star from lucide-react
- Create ResultsContent() function that:
  * Uses useSearchParams to get 'data' param
  * Parses answers: const answers = JSON.parse(decodeURIComponent(data))
  * Gets currentAge from answers
  
VISUAL TIMELINE:
- SVG chart (600x300) showing fertility curve
- Data points from age 25-50
- Fertility calculation: 100% at 25, 86% at 32, 71% at 35, 50% at 38, drops to 10% by 45
- Path curve in purple stroke
- Fill areas: green (<32), yellow (33-38), red (39+)
- Red vertical line at user's current age with "You are here" label
- Age labels at bottom (25, 30, 35, 40, 45)
- Legend: green "Optimal 80%+", yellow "Good 60-79%", red "Declining <60%"

TIMELINE CARDS:
- 3 Cards in grid:
  * Green: "Optimal Window: Ages X-35, 80%+ conception"
  * Yellow: "Good Window: 36-38, 60-79%"
  * Red: "Declining: 39-42, 30-59%"

INSIGHT CARD:
- Purple background
- "Women in serious relationships who haven't discussed children by year 3 are 73% less likely to have them together"

PAYWALL:
- Card with gradient border
- Lock icon, "🔒 Unlock Your Full Personalized Report"
- 6 items with CheckCircle2 icon:
  * "How your relationship compares to 500+ women"
  * "Red flags in your situation"
  * "Exact action plan with dates"
  * "Stories from women who waited vs didn't"
  * "Fertility clinic recommendations"  
  * "Egg freezing calculator"
- Blurred preview Card (backdrop-blur)
- Email Input field
- Pricing: $49.99 line-through, $29.99 big bold
- Button "UNLOCK MY FULL REPORT - $29.99" (gradient purple/pink)
- Social proof: "247 women unlocked today", 5 Star icons "4.9/5 (1,847 reviews)"

Export default function wrapping ResultsContent in Suspense.
Complete TypeScript, Tailwind, Framer Motion code.`);
  
  fs.writeFileSync('app/results/page.tsx', results);
  console.log('✅ app/results/page.tsx\n');
  
  console.log('✨ Done! All 3 files generated with Claude Opus 4.6');
  console.log('Run: npm run build && git add -A && git commit -m "Fresh Opus 4.6 rebuild" && git push');
})();
