#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });
const reddit = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

(async () => {
  console.log('🎨 Rebuilding ALL 3 pages with Claude Opus 4.6...\n');
  
  // 1. Landing
  console.log('1/3 Building landing...');
  const landing = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4000,
    messages: [{ role: 'user', content: `Build premium landing page app/page.tsx:
- Claira logo (Cormorant Garamond serif)
- "Am I Wasting My Fertile Years?"
- Real quote: "${reddit[0].title}" (${reddit[0].score} upvotes)
- "12,847 women took this"
- Benefits: 💫🚩📊
- Big gradient button → router.push('/quiz')
- Trust: 100% Anonymous, 2 min
- Purple/pink gradient bg, floating shapes
- Framer Motion animations
Next.js TypeScript Tailwind shadcn/ui` }]
  });
  fs.writeFileSync('app/page.tsx', landing.content[0].text.match(/\`\`\`(?:tsx|typescript)\n([\s\S]*?)\`\`\`/)[1]);
  console.log('✅ app/page.tsx');
  
  // 2. Quiz
  console.log('2/3 Building quiz...');
  const quiz = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 6000,
    messages: [{ role: 'user', content: `Build quiz page app/quiz/page.tsx:
- 10 questions (age, relationship, discussed kids, anxiety, mother history, concern)
- Progress bar animated
- After Q2/Q4/Q7: purple insight card pops up 3sec, auto proceeds
- Framer Motion slide transitions
- Options are clickable cards
- router.push('/results?data=' + JSON.stringify(answers))
Next.js TypeScript Tailwind Framer Motion` }]
  });
  fs.writeFileSync('app/quiz/page.tsx', quiz.content[0].text.match(/\`\`\`(?:tsx|typescript)\n([\s\S]*?)\`\`\`/)[1]);
  console.log('✅ app/quiz/page.tsx');
  
  // 3. Results
  console.log('3/3 Building results...');
  const results = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 6000,
    messages: [{ role: 'user', content: `Build results page app/results/page.tsx:
- useSearchParams to get data (wrap in Suspense)
- SVG fertility curve chart (green/yellow/red zones, red line at user age)
- 3 timeline cards (optimal/good/declining)
- Insight card
- Paywall: 🔒 heading, 6 checkmarks, blurred preview, email input, $49.99→$29.99, gradient button, social proof
Next.js TypeScript Tailwind Framer Motion` }]
  });
  fs.writeFileSync('app/results/page.tsx', results.content[0].text.match(/\`\`\`(?:tsx|typescript)\n([\s\S]*?)\`\`\`/)[1]);
  console.log('✅ app/results/page.tsx\n');
  
  console.log('Done! Run: npm run build && git push');
})();
