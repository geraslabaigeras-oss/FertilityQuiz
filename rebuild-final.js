#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const anthropic = new Anthropic({
  apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim()
});

const redditData = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

async function rebuildFinal() {
  console.log('🎨 FINAL REBUILD - Making Claira actually premium...\n');

  let fullContent = '';

  const stream = await anthropic.messages.stream({
    model: 'claude-opus-4-20250514',
    max_tokens: 16000,
    messages: [{
      role: 'user',
      content: `CRITICAL: You are rebuilding Claira fertility quiz. I keep getting basic shit. Make it ACTUALLY premium.

## REQUIREMENTS (DO NOT SKIP ANY):

### 1. LANDING PAGE (app/page.tsx)
- Claira logo (elegant serif)
- "Am I Wasting My Fertile Years?" headline
- Real Reddit quote: "${redditData[0].title}" (${redditData[0].score} upvotes)
- "12,847 women have taken this" counter
- Benefits with emojis (💫🚩📊)
- BIG "START YOUR FREE ASSESSMENT" button → /quiz
- Trust badges: 100% Anonymous, 2 minutes
- Smooth Framer Motion fade-ins
- Purple/pink gradient background with floating shapes
- Featured from: r/relationships, r/TwoXChromosomes badges

### 2. QUIZ PAGE (app/quiz/page.tsx)
**CRITICAL FEATURES:**

**Progress:**
- Top: "Claira" logo + "Question 3 of 10"
- Animated progress bar (purple gradient)

**Questions (10 total):**
1. Age (number input)
2. Relationship status (4 options)
3. Relationship length (5 options)
4. Discussed kids? (5 options)
5. Partner wants kids? (5 options)
6. Anxiety 1-10 (number input)
7. Mother's first child age (6 options)
8. Mother's menopause (5 options)
9. Family fertility issues (4 options)
10. Biggest concern (5 options)

**MINI-INSIGHTS (pop up AFTER answering):**
- After Q2: "62% of women in serious relationships discuss family planning within 2 years"
- After Q4: "Partners who avoid this conversation for 3+ years: 73% less likely to have kids together"
- After Q7: "90% of women experience menopause within 5 years of their mother's age"

Show insight in purple card with TrendingUp icon, fade in with Framer Motion.

**Animations:**
- Each question fades in (slide from right)
- Options have hover effects (scale, border glow)
- "Next" button disabled until answer selected
- Smooth transition between questions

**After Q10 → Navigate to /results with URL params:**
\`router.push('/results?data=' + encodeURIComponent(JSON.stringify(answers)))\`

### 3. RESULTS PAGE (app/results/page.tsx)

**FREE PREVIEW (show first):**

**Visual Timeline (NOT text blocks):**
- Use Chart.js or recharts OR custom SVG
- Show fertility curve: peak at 25-32, decline 33-38, steep drop 39+
- Mark user's current age with red line
- Color zones: green (optimal), yellow (good), red (declining)

**Timeline breakdown:**
- Optimal window: Ages X-35 (80%+ chance)
- Good window: 36-38 (60-79%)
- Declining: 39-42 (30-59%)

**Sample insight card:**
"Women in serious relationships who haven't discussed children by year 3 are 73% less likely to have them with their current partner."

**PAYWALL (after preview):**

**Heading:** 🔒 Unlock Your Full Personalized Report

**What's unlocked (with checkmarks):**
- How your relationship compares to 500+ women
- Red flags in your situation
- Exact action plan with dates
- Stories from women who waited vs didn't
- Fertility clinic recommendations
- Egg freezing calculator

**BLURRED PREVIEW:** Show one insight card but blurred with backdrop-filter

**Email capture:**
\`<input placeholder="Enter email to unlock" />\`

**Pricing:**
- $49.99 crossed out
- $29.99 big and bold
- "One-time payment • Instant access"

**CTA button:** "UNLOCK MY FULL REPORT - $29.99"

**Social proof:**
- "247 women unlocked today"
- 5 stars "4.9/5 (1,847 reviews)"

### DESIGN SYSTEM:

**Colors:**
- Purple: #7C3AED, #9333EA
- Pink: #EC4899
- Background: Gradient from purple-50 to pink-50
- Cards: white/95 with backdrop-blur
- Text: gray-900 for headlines, gray-600 for body

**Typography:**
- Headlines: Cormorant Garamond (serif)
- Body: -apple-system, sans-serif
- Buttons: font-semibold

**Animations (Framer Motion):**
- Fade in: \`initial={{ opacity: 0, y: 20 }}\`
- Slide: \`initial={{ opacity: 0, x: 50 }}\`
- Scale on hover: \`whileHover={{ scale: 1.02 }}\`
- All transitions: \`transition={{ duration: 0.3 }}\`

**Components (use shadcn/ui):**
- Button, Card, Input already installed
- Use them consistently

### TECH:
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Client components ("use client")

Generate ALL THREE files:
1. app/page.tsx (landing)
2. app/quiz/page.tsx (quiz with insights)
3. app/results/page.tsx (visual timeline + paywall)

Make it PREMIUM. Make it TRUSTWORTHY. Make it CONVERT.`
    }]
  });

  stream.on('text', (text) => {
    process.stdout.write(text);
    fullContent += text;
  });

  await stream.finalMessage();

  console.log('\n\n✅ Done generating\n');
  
  fs.writeFileSync('opus-final-rebuild.md', fullContent);
  
  // Extract all code blocks
  const codeBlocks = [...fullContent.matchAll(/```(?:tsx|typescript)\n([\s\S]*?)```/g)];
  
  if (codeBlocks.length >= 3) {
    fs.writeFileSync('app/page.tsx', codeBlocks[0][1]);
    console.log('✅ Wrote app/page.tsx');
    
    fs.writeFileSync('app/quiz/page.tsx', codeBlocks[1][1]);
    console.log('✅ Wrote app/quiz/page.tsx');
    
    fs.writeFileSync('app/results/page.tsx', codeBlocks[2][1]);
    console.log('✅ Wrote app/results/page.tsx');
  } else {
    console.log(`⚠️  Only found ${codeBlocks.length} code blocks, expected 3`);
  }
  
  console.log('\nRun: npm run build && git add -A && git commit -m "Claira rebuild: premium design, visual timeline, smart insights" && git push');
}

rebuildFinal().catch(console.error);
