#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim()
});

// Load real Reddit data
const redditData = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

async function buildRealLanding() {
  console.log('🎨 Building REAL landing page with actual data...\n');

  let fullContent = '';

  const stream = await anthropic.messages.stream({
    model: 'claude-opus-4-20250514',
    max_tokens: 16000,
    messages: [{
      role: 'user',
      content: `You are building a HIGH-CONVERTING landing page for a fertility timeline quiz targeting women 25-45 in relationships.

## REAL DATA I SCRAPED:

### Top Reddit Posts (Real Quotes):
${redditData.slice(0, 10).map((post, i) => `
${i+1}. [${post.score} upvotes, ${post.num_comments} comments] r/${post.subreddit}
Title: "${post.title}"
Text: "${post.selftext.substring(0, 200)}..."
`).join('\n')}

### Real Research:
- ACOG (American College of Obstetricians): Fertility declines with age
- Study: Variation in pregnancy length spans 37 days even in healthy pregnancies
- Reality: Most women don't know their timeline until too late

## YOUR MISSION:

Build a landing page that uses THIS REAL DATA - not fake stats.

### DESIGN REQUIREMENTS:

1. **Premium Feel**
   - Soft gradients (cream/ivory/sage/rose)
   - Smooth Framer Motion animations
   - Parallax scrolling effects
   - Micro-interactions on hover
   - Modern serif fonts (Cormorant Garamond for headlines)
   - Generous white space

2. **Real Voices Section**
   - Pull 3-4 ACTUAL Reddit titles/quotes from the data above
   - Show real upvote counts
   - "Women are talking about this..."
   - Make it feel authentic, not curated

3. **Emotional Hook**
   - Headline based on REAL pain points from Reddit:
     * "Is he wasting your time?"
     * "Should you still be waiting?"
     * "The conversation that's harder than it should be"
   - Subhead that validates without fear-mongering

4. **Trust Signals**
   - "Based on analysis of 1,054 relationship posts"
   - "ACOG data on fertility timelines"
   - No fake doctor quotes - use real research citations

5. **Sections:**
   - Hero (emotional headline + CTA)
   - Real voices (3-4 Reddit quotes with upvotes)
   - The reality (stats from research)
   - How it works (simple, 3 steps)
   - Why this matters (emotional + practical)
   - Final CTA

6. **Animations:**
   - Fade in on scroll
   - Smooth parallax background elements
   - Hover effects on cards
   - Progress indicators
   - Subtle floating shapes

7. **CTA:**
   - Primary: "Discover Your Timeline" (emerald/sage green button)
   - Secondary mentions throughout
   - No pressure, just empowerment framing

8. **Visual Style:**
   - Abstract shapes/gradients (no stock photos)
   - Subtle textures
   - Card-based layout with shadows
   - Mobile-first responsive

### COPY TONE:
- Friend talking to friend
- Honest, not clinical
- "This is what women are actually saying..."
- Empowering: "You deserve clarity"
- NO fake testimonials - use real Reddit voices

### TECH STACK:
- Next.js 14+ with TypeScript
- Tailwind CSS (custom colors)
- Framer Motion (smooth, elegant animations)
- shadcn/ui components

Generate the complete app/page.tsx file that feels REAL, TRUSTWORTHY, and PREMIUM.

Make it the kind of page where a 32-year-old woman in a 4-year relationship thinks "Fuck, this is exactly what I'm going through" and immediately clicks.`
    }]
  });

  stream.on('text', (text) => {
    process.stdout.write(text);
    fullContent += text;
  });

  await stream.finalMessage();

  console.log('\n\n✅ Response received\n');
  
  fs.writeFileSync('opus-real-landing.md', fullContent);
  console.log('📝 Saved to opus-real-landing.md\n');
  
  // Extract code
  const codeMatch = fullContent.match(/```(?:tsx|typescript)\n([\s\S]*?)```/);
  if (codeMatch) {
    fs.writeFileSync('app/page.tsx', codeMatch[1]);
    console.log('✅ Wrote app/page.tsx\n');
  }
  
  console.log('✨ Done! Run: npm run build');
}

buildRealLanding().catch(console.error);
