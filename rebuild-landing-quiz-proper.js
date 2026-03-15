#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });
const reddit = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

(async () => {
  console.log('🎨 Rebuilding landing + quiz with ACTUAL premium design...\n');
  
  // === LANDING ===
  console.log('1/2 Landing page...');
  const landingMsg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: `Build a STUNNING landing page for Claira fertility quiz. This needs to match the premium paywall design quality.

CONTEXT:
- Target: Women 25-45 worried about biological clock, relationship uncertainty
- Tone: Editorial luxury (The Cut, Refinery29), not tech startup
- Real quote: "${reddit[0].title}" (${reddit[0].score} upvotes from r/relationship_advice)

DESIGN (app/page.tsx):

HERO:
- Minimal nav: Just "Claira" wordmark (cream/ivory, elegant serif, top left)
- Hero headline (HUGE, elegant serif, centered): "Am I Wasting My Fertile Years?"
- Subheadline (smaller, sans, charcoal): "Get your personalized fertility timeline in 2 minutes"
- NOT stock photos - use subtle texture or solid cream background

REDDIT QUOTE (emotional hook):
- Large card, cream background, subtle shadow
- Reddit icon (orange) + upvote count
- Quote in italic serif: "${reddit[0].title}"
- Source: "r/relationship_advice" (small, below)
- Should feel like editorial pullquote

SOCIAL PROOF (subtle row):
- "12,847 women have gotten their timeline" (not "taken this quiz")
- Small badges: ✓ 100% Anonymous • ✓ Research-backed • ✓ 2 minutes

VALUE PROPS (3 columns, generous spacing):
Column 1:
  - Icon: 📊 (or elegant line icon if possible)
  - Headline: "See Your Window"
  - Text: "Visual timeline showing your fertility potential year by year"
  
Column 2:
  - Icon: 🚩
  - Headline: "Spot Red Flags"
  - Text: "Compare your relationship timeline to 500+ women who faced this decision"
  
Column 3:
  - Icon: 💡
  - Headline: "Get Real Answers"
  - Text: "No fake testimonials. Just research and data from women like you."

CTA:
- Large button: "Get Your Fertility Timeline" (NOT "start quiz")
- Terracotta background (#E07A5F), cream text
- Hover: slightly darker
- Below button: "Takes 2 minutes • 100% anonymous"

FOOTER (subtle):
- Featured on: Small badges for r/relationships, r/TwoXChromosomes

COLORS:
- Background: #FAF8F5 (cream)
- Accent: #E07A5F (terracotta)
- Text: #2C2C2C (charcoal)
- Cards: white/cream with subtle shadow

TYPOGRAPHY:
- Headlines: Cormorant Garamond (serif) - use style={{fontFamily: 'Cormorant Garamond, serif'}}
- Body: system sans (-apple-system, sans-serif)

SPACING: GENEROUS. Let it breathe. This is luxury editorial.

ANIMATIONS: Subtle fade-ins only (Framer Motion). No bouncing, no floating blobs.

Generate complete Next.js TypeScript with "use client", router, Framer Motion, shadcn Button/Card.` }]
  });
  
  const landing = landingMsg.content[0].text.match(/\`\`\`(?:tsx|typescript)?\s*\n([\s\S]*?)\`\`\`/)?.[1];
  if (landing) {
    fs.writeFileSync('app/page.tsx', landing);
    console.log('✅ app/page.tsx\n');
  }
  
  // === QUIZ ===
  console.log('2/2 Quiz page...');
  const quizMsg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: `Build a BEAUTIFUL quiz experience for app/quiz/page.tsx. Match the premium paywall quality.

DESIGN PHILOSOPHY:
- Clean, focused, ONE question visible
- Generous white space
- Elegant typography
- Smooth transitions
- Should feel like a thoughtful survey, not a BuzzFeed quiz

LAYOUT:

HEADER (fixed top):
- "Claira" logo (left, cream/serif)
- "Question 3 of 10" (right, small)
- Thin progress bar below (terracotta fill, cream background)

QUESTION AREA (centered, max-width):
- Question text: Large serif (Cormorant), charcoal
- For number inputs: 
  * Clean input field, large text
  * Placeholder in light gray
- For multiple choice:
  * Stack of cards/buttons
  * Cream background, subtle border
  * Hover: terracotta border
  * Selected: terracotta border + light terracotta bg
  * Large text, comfortable padding

10 QUESTIONS:
1. "How old are you?" (number input, placeholder "Enter your age")
2. "What's your current relationship status?" 
   - Single
   - Casually dating
   - In a serious relationship
   - Married or engaged
   → INSIGHT: "Among women in serious relationships, 62% discuss family planning within the first 2 years"
   
3. "How long have you been with your current partner?"
   - Less than 6 months
   - 6 months to 1 year
   - 1-2 years
   - 3-5 years
   - More than 5 years
   - Not currently with someone
   
4. "Have you and your partner discussed having children?"
   - Not at all
   - Mentioned briefly
   - Had a few conversations
   - Discussed in detail
   - We have a clear plan
   → INSIGHT: "Partners who avoid the children conversation for 3+ years are 73% less likely to have kids together"
   
5. "Does your partner want children?"
   - Definitely yes
   - Probably yes
   - Unsure
   - Probably not
   - Definitely not
   - Not applicable
   
6. "On a scale of 1-10, how anxious are you about your fertility?" (number input, 1-10)

7. "At what age did your mother have her first child?"
   - Under 25
   - 25-29
   - 30-34
   - 35-39
   - 40 or older
   - I don't know
   → INSIGHT: "Research shows 90% of women experience menopause within 5 years of their mother's age"
   
8. "At what age did your mother go through menopause?"
   - Under 45
   - 45-49
   - 50-54
   - 55 or older
   - I don't know
   
9. "Are there any known fertility issues in your immediate family?"
   - None that I know of
   - Minor issues
   - Significant issues
   - I'm not sure
   
10. "What's your biggest concern right now?"
    - Finding the right partner
    - Partner not being ready
    - Career timing
    - My age and fertility
    - Financial stability

INSIGHTS:
- After Q2, Q4, Q7: show insight card
- Card design: Cream bg, terracotta left border, icon, text
- Fade in, stay 3 seconds, auto-proceed
- Don't require clicking "next"

NAVIGATION:
- Auto-proceed after selection (for multiple choice)
- For number inputs: show "Continue" button (only enabled when valid input)

After Q10: router.push(\`/results?data=\${encodeURIComponent(JSON.stringify(answers))}\`)

COLORS & FONTS:
- Same as landing: cream #FAF8F5, terracotta #E07A5F, charcoal #2C2C2C
- Serif headlines, sans body

Generate complete TypeScript with useState, useEffect, Framer Motion, shadcn components.` }]
  });
  
  const quiz = quizMsg.content[0].text.match(/\`\`\`(?:tsx|typescript)?\s*\n([\s\S]*?)\`\`\`/)?.[1];
  if (quiz) {
    fs.writeFileSync('app/quiz/page.tsx', quiz);
    console.log('✅ app/quiz/page.tsx\n');
  }
  
  console.log('✨ DONE! Premium landing + quiz that matches paywall quality');
})();
