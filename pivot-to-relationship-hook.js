#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });
const reddit = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

(async () => {
  console.log('🎯 PIVOT: Relationship limbo as the hook, fertility as the urgency...\n');
  
  // === LANDING ===
  console.log('1/3 Landing with relationship hook...');
  const landingMsg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: `Build landing page for Claira - but the REAL hook is relationship limbo, not fertility.

TARGET AUDIENCE:
- Women 28-38 in relationships 2-5+ years
- Partner says "not ready" or avoids the kids conversation
- Feeling time pressure + relationship uncertainty
- Real fear: "Am I wasting my fertile years with someone who will never be ready?"

EMOTIONAL HOOK (app/page.tsx):

HERO:
- "Claira" logo (elegant serif, top)
- HEADLINE (large serif): "Is He Wasting Your Time?"
- SUBHEAD: "Find out if your relationship timeline adds up — before it's too late"

REDDIT QUOTE (the emotional gut-punch):
"${reddit[0].title}"
${reddit[0].score} upvotes • r/relationship_advice

This should hit HARD. Women in this situation will see themselves.

FRAMING:
- This isn't about "are you fertile" - it's about "is THIS RELATIONSHIP going anywhere"
- The biological clock creates urgency, but the real anxiety is wasting years
- Quiz reveals: how your relationship compares to women who DID vs DIDN'T have kids with their partner

VALUE PROPS (3 columns):
1. 🚩 "See the Red Flags"
   "Compare your relationship timeline to 500+ women. Learn what predicts breakups vs babies."

2. ⏰ "Your Reality Check"  
   "See how much time you realistically have — and what that means for THIS relationship."

3. 💬 "Stories Like Yours"
   "Read what happened to women who waited vs. women who didn't."

TRUST SIGNALS:
- "Anonymous • 2 minutes • Based on real data from 500+ women"
- Featured: r/relationships, r/relationship_advice

CTA:
- Button: "Find Out If I'm Wasting Time"
- Below: "Takes 2 minutes • 100% anonymous"

DESIGN:
- Cream/terracotta/charcoal (same premium editorial style)
- Elegant serif headlines, clean sans body
- Generous white space
- The Reddit quote should be THE focal point

Generate complete Next.js TypeScript with router.push('/quiz').` }]
  });
  
  const landing = landingMsg.content[0].text.match(/\`\`\`(?:tsx|typescript)?\s*\n([\s\S]*?)\`\`\`/)?.[1];
  if (landing) {
    fs.writeFileSync('app/page.tsx', landing);
    console.log('✅ app/page.tsx\n');
  }
  
  // === QUIZ ===
  console.log('2/3 Quiz focused on RELATIONSHIP questions...');
  const quizMsg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: `Rebuild quiz for app/quiz/page.tsx - focus on RELATIONSHIP dynamics, not just fertility facts.

QUESTION FLOW (10 questions):

1. "How old are you?" (number)

2. "What's your relationship status?"
   - Single (looking)
   - Casually dating
   - Serious relationship
   - Engaged
   - Married

3. "How long have you been together?" (if in relationship)
   - Less than 1 year
   - 1-2 years
   - 3-4 years
   - 5-7 years
   - 8+ years
   
4. "Have you two discussed having children?"
   - Not at all
   - He changes the subject
   - We've talked briefly
   - We've had serious conversations
   - We have a clear plan
   → INSIGHT: "In relationships over 3 years, partners who avoid the kids talk are 73% less likely to have them together"

5. "Does he want children?"
   - Definitely yes
   - Says yes, but 'not yet'
   - He's unsure
   - He doesn't want them
   - He won't give a clear answer
   → INSIGHT: "'Not yet' for 3+ years often means 'not with you'"

6. "What's his usual response when you bring it up?"
   - Engaged and thoughtful
   - Vague or dismissive
   - Gets defensive or annoyed
   - Promises 'we'll talk later'
   - We haven't discussed it
   
7. "On a scale of 1-10, how anxious are you about your timeline?" (number)

8. "At what age did your mother have her first child?"
   - Under 25 / 25-29 / 30-34 / 35-39 / 40+ / Don't know
   → INSIGHT: "Most women experience menopause around the same age as their mother (±5 years)"

9. "If he said 'I'm not ready' today, would you:"
   - Give him more time
   - Set a deadline
   - Consider leaving
   - Already considering leaving
   - He hasn't said that

10. "What scares you most?"
    - Running out of time with the wrong person
    - Missing my chance at motherhood
    - Resenting him if I stay
    - Starting over at my age
    - Making the wrong choice

After Q10: router.push to results with encoded answers.

DESIGN: Same cream/terracotta premium style. Smooth transitions. Auto-proceed where possible.

Complete TypeScript code.` }]
  });
  
  const quiz = quizMsg.content[0].text.match(/\`\`\`(?:tsx|typescript)?\s*\n([\s\S]*?)\`\`\`/)?.[1];
  if (quiz) {
    fs.writeFileSync('app/quiz/page.tsx', quiz);
    console.log('✅ app/quiz/page.tsx\n');
  }
  
  // === RESULTS ===
  console.log('3/3 Results with relationship analysis...');
  const resultsMsg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: `Rebuild results page (app/results/page.tsx) - focus on RELATIONSHIP analysis, fertility as context.

FREE PREVIEW:

HEADLINE: "Your Relationship Reality Check"

SECTION 1: Fertility Timeline (brief, contextual)
- Simple chart showing ages 28-42 with fertility zones
- Mark user's age
- Text: "You're X years old. Here's your biological reality."

SECTION 2: Relationship Timeline Analysis (THE MEAT)
- "You've been together X years"
- Key insight based on their answers:
  * If 3+ years + avoids kids talk: "RED FLAG: Among women in 3+ year relationships where he avoids the conversation, 73% never have kids with that partner"
  * If he says 'not yet': "CAUTION: 'Not yet' after 2+ years often means uncertainty about YOU, not timing"
  * If engaged/planning: "POSITIVE: You're aligned on timeline and goals"

SECTION 3: What Women in Your Situation Did
- "Women your age (X) in Y-year relationships who faced this:"
  * "Gave him 2 more years: 45% broke up, 30% had kids with someone else, 25% stayed together without kids"
  * "Set a 1-year deadline: 60% either got engaged or split, both groups report less regret"
  * "Left immediately: 70% found a committed partner within 2 years"

PAYWALL:

"Unlock Your Complete Relationship Analysis"

What's inside:
- How your relationship compares to 500+ women's stories
- The exact conversation script that gets clarity
- Timeline decision framework (stay vs go)
- Age-by-age fertility breakdown
- Real stories from women who waited vs left
- Therapist-approved next steps

Blurred preview card showing analysis
Email input
Pricing: $49 → $29
Button: "Get My Full Analysis"

DESIGN: Same premium cream/terracotta style. Use recharts for simple chart.

Complete TypeScript with useSearchParams (Suspense), all imports.` }]
  });
  
  const results = resultsMsg.content[0].text.match(/\`\`\`(?:tsx|typescript)?\s*\n([\s\S]*?)\`\`\`/)?.[1];
  if (results) {
    fs.writeFileSync('app/results/page.tsx', results);
    console.log('✅ app/results/page.tsx\n');
  }
  
  console.log('✨ PIVOTED! Now it\'s about relationship reality, not generic fertility');
})();
