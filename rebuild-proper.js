#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim()
});

// Load the working v1 HTML
const v1HTML = fs.readFileSync('/root/.openclaw/workspace/Claira.Landing/index.html', 'utf-8');

// Load Reddit data
const redditData = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

async function rebuildProper() {
  console.log('🎨 Rebuilding Claira with Next.js + keeping what works...\n');

  let fullContent = '';

  const stream = await anthropic.messages.stream({
    model: 'claude-opus-4-20250514',
    max_tokens: 16000,
    messages: [{
      role: 'user',
      content: `You are rebuilding the Claira fertility quiz landing page. I have a working v1 that converts, but it needs to be WAY better.

## WORKING V1 (KEEP THIS FLOW):
${v1HTML}

## WHAT WORKED IN V1:
1. Simple landing with immediate CTA "START YOUR FREE ASSESSMENT"
2. Purple gradient background, clean white card design
3. Clear value props with emojis (💫🚩📊)
4. Social proof: "12,847 women have taken this"
5. Progress bar during quiz
6. 10 questions (mix of options + number inputs)
7. FREE PREVIEW of results first (shows timeline)
8. THEN paywall with clear unlock benefits
9. $29.99 price with $49.99 crossed out

## WHAT TO MAKE BETTER:

### 1. BRAND IDENTITY - "Claira"
- Add logo (text-based for now: elegant serif "Claira")
- Prettier color scheme (keep purple but make it luxe)
- Cream/ivory backgrounds instead of pure white
- Rose/sage accent colors

### 2. PREMIUM VISUAL DESIGN
- Use Tailwind + Framer Motion
- Smooth animations (fade in, slide up)
- Better typography (Cormorant Garamond for serif headlines)
- Gradient buttons with hover effects
- Card shadows and depth
- Floating decorative shapes in background

### 3. REAL DATA INTEGRATION
- Instead of generic "12,847 women", use real Reddit stats
- "Based on 1,054 real relationship posts analyzed"
- Show snippet of real Reddit quote on landing: "${redditData[0].title}" (${redditData[0].score} upvotes)
- Add "Featured insights from r/relationships, r/TwoXChromosomes" credibility

### 4. BETTER QUIZ EXPERIENCE
- Each question: smooth animation in
- Add mini-insights BETWEEN questions (like "90% of women experience menopause within 5 years of their mother")
- Visual progress indicator (not just bar - show "3/10" too)
- Better input styling
- Keep the same 10 questions from v1

### 5. ENHANCED RESULTS PREVIEW
- Visual timeline (not just text)
- Use charts/graphs (fertility curve visualization)
- Add comparison: "Women your age typically..."
- Show ONE real Reddit story snippet that matches their situation

### 6. SMARTER PAYWALL
- Keep the $29.99 price
- Better visual presentation of what's unlocked
- Add urgency: "247 women unlocked today"
- Preview one blurred insight they can't see yet
- Email capture BEFORE payment

### 7. TRUST ELEMENTS
- Add "As analyzed in" section with Reddit logo, research citation
- Privacy badge: "Your data is private"
- "100% anonymous quiz"

## TECH REQUIREMENTS:
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS (custom colors)
- Framer Motion for animations
- shadcn/ui components
- Client-side state management (useState for quiz flow)

## FILE STRUCTURE:
Generate app/page.tsx that includes:
1. Landing section (visible on load)
2. Quiz flow (10 questions, state-managed)
3. Results preview (free)
4. Paywall section

Use URL params or local state to track progress (don't need separate routes yet).

## COPY TONE:
- Keep v1's friendly, direct tone
- "Am I Wasting My Fertile Years?" - keep this headline
- Add Claira branding throughout
- Real data, not bullshit

Make it BEAUTIFUL, TRUSTWORTHY, and HIGH-CONVERTING. This needs to be the kind of page that makes a woman immediately click "START" and complete the entire quiz.`
    }]
  });

  stream.on('text', (text) => {
    process.stdout.write(text);
    fullContent += text;
  });

  await stream.finalMessage();

  console.log('\n\n✅ Done\n');
  
  fs.writeFileSync('opus-rebuild.md', fullContent);
  console.log('📝 Saved to opus-rebuild.md\n');
  
  // Extract code
  const codeMatch = fullContent.match(/```(?:tsx|typescript)\n([\s\S]*?)```/);
  if (codeMatch) {
    fs.writeFileSync('app/page.tsx', codeMatch[1]);
    console.log('✅ Wrote app/page.tsx\n');
  }
  
  console.log('Run: npm run build && git push');
}

rebuildProper().catch(console.error);
