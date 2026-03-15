#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const anthropic = new Anthropic({
  apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim()
});

const redditData = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

async function rebuildAll() {
  console.log('🎨 Rebuilding Claira with ACTUAL Claude Opus 4...\n');

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 16000,
    timeout: 300000,
    messages: [{
      role: 'user',
      content: `You are building Claira - a premium fertility timeline quiz that CONVERTS.

I have REAL Reddit data:
Top post: "${redditData[0].title}" (${redditData[0].score} upvotes)

Build 3 files for Next.js 14 + TypeScript + Tailwind + Framer Motion + shadcn/ui:

=== FILE 1: app/page.tsx (LANDING) ===

Requirements:
- Claira logo (Cormorant Garamond serif, purple)
- Headline: "Am I Wasting My Fertile Years?"
- Show REAL Reddit quote with upvotes
- Social proof: "12,847 women took this"
- Benefits with emojis: 💫🚩📊
- BIG gradient button "START YOUR FREE ASSESSMENT" → router.push('/quiz')
- Trust badges: Shield icon "100% Anonymous", Clock "2 minutes"
- Featured badges: r/relationships, r/TwoXChromosomes
- Purple/pink gradient background with floating shapes
- Smooth Framer Motion fade-ins (stagger delays)

=== FILE 2: app/quiz/page.tsx (QUIZ FLOW) ===

10 Questions:
1. Age (number input)
2. Relationship status (4 options) → INSIGHT AFTER: "62% discuss planning within 2 years"
3. How long together (5 options)
4. Discussed kids? (5 options) → INSIGHT: "73% less likely if avoided 3+ years"
5. Partner wants kids? (5 options)
6. Anxiety 1-10 (number input)
7. Mother first child (6 options) → INSIGHT: "90% menopause within 5 years of mother"
8. Mother menopause (5 options)
9. Family issues (4 options)
10. Biggest concern (5 options)

CRITICAL FEATURES:
- Progress bar at top (purple gradient, animated width)
- "Question X of 10" text
- Each question fades in from right (Framer Motion)
- Options are buttons with hover scale effect
- After answering Q2/Q4/Q7: show purple insight card for 3 seconds then auto-proceed
- Insight card: TrendingUp icon + text, fade in from bottom
- After Q10: router.push('/results?data=' + JSON.stringify(answers))
- Disabled "Next" until answer selected

=== FILE 3: app/results/page.tsx (RESULTS + PAYWALL) ===

FREE PREVIEW SECTION:
- useSearchParams() to get data
- "Your Fertility Timeline" heading
- VISUAL SVG CHART showing fertility curve from age 25-50
  * Green zone 25-32 (optimal)
  * Yellow 33-38 (good)
  * Red 39+ (declining)
  * Red vertical line at user's age with "You are here"
- 3 colored cards: Optimal Window (ages X-35), Good (36-38), Declining (39-42)
- 1 insight card: "Women who haven't discussed by year 3: 73% less likely..."

PAYWALL SECTION:
- 🔒 Lock icon + "Unlock Your Full Report"
- 6 checkmarks: comparison to 500+ women, red flags, action plan, stories, clinic recs, calculator
- BLURRED preview card (use blur-sm + backdrop-blur)
- Email input field
- Pricing: $49.99 crossed out, $29.99 BIG
- "One-time payment • Instant access"
- Purple gradient CTA button "UNLOCK - $29.99"
- Social proof: "247 unlocked today" + 5 stars "4.9/5 (1,847 reviews)"

DESIGN SYSTEM FOR ALL:
- Colors: purple-600, pink-600, gradients
- Background: from-purple-50 via-pink-50 to-purple-50
- Cards: bg-white/95 backdrop-blur shadow-xl
- Buttons: gradient from-purple-600 to-pink-600, whileHover scale 1.05
- Typography: headlines Cormorant Garamond, body system sans
- All animations: Framer Motion with smooth transitions

Generate ALL 3 complete files. Make them PREMIUM and CONVERSION-FOCUSED.`
    }]
  });

  console.log('✅ Response received\n');
  
  const content = message.content[0].text;
  fs.writeFileSync('opus4-full-rebuild.md', content);
  console.log('📝 Saved to opus4-full-rebuild.md\n');
  
  const codeBlocks = [...content.matchAll(/```(?:tsx|typescript)\n([\s\S]*?)```/g)];
  console.log(`Found ${codeBlocks.length} code blocks\n`);
  
  if (codeBlocks.length >= 3) {
    fs.writeFileSync('app/page.tsx', codeBlocks[0][1]);
    console.log('✅ app/page.tsx');
    
    fs.writeFileSync('app/quiz/page.tsx', codeBlocks[1][1]);
    console.log('✅ app/quiz/page.tsx');
    
    fs.writeFileSync('app/results/page.tsx', codeBlocks[2][1]);
    console.log('✅ app/results/page.tsx\n');
    
    console.log('Run: npm run build && git push');
  }
}

rebuildAll().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
