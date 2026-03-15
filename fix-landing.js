#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });
const reddit = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

(async () => {
  console.log('Rebuilding landing...');
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 6000,
    messages: [{ role: 'user', content: `Build app/page.tsx landing for Claira fertility quiz.

Design: Editorial luxury (cream #FAF8F5, terracotta #E07A5F, charcoal text). NO purple/pink.

Structure:
- Elegant "Claira" logo (serif)
- "Am I Wasting My Fertile Years?" (large serif headline)
- Subhead about personalized timeline
- Reddit quote card: "${reddit[0].title}" (${reddit[0].score} upvotes)
- "12,847 women took this" (subtle)
- 3 benefits: 💫 📊 🚩
- Big CTA button "Get My Fertility Timeline" → router.push('/quiz')
- Trust badges: Anonymous, 2min, Research-backed
- Featured: r/relationships, r/TwoXChromosomes

Use Next.js, TypeScript, Tailwind, Framer Motion, shadcn Button/Card.
Keep template literals SIMPLE. Generate complete code.` }]
  });
  const code = msg.content[0].text.match(/\`\`\`(?:tsx|typescript)?\s*\n([\s\S]*?)\`\`\`/)?.[1];
  fs.writeFileSync('app/page.tsx', code || msg.content[0].text);
  console.log('✅');
})();
