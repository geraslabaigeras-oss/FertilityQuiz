#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });

(async () => {
  console.log('Building quiz with Opus 4...');
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 6000,
    messages: [{ role: 'user', content: 'Build app/quiz/page.tsx: 10-question quiz, progress bar, Framer Motion slide transitions, insights pop up after Q2/Q4/Q7 for 3sec then auto-proceed, purple theme, router.push to /results with answers. Next.js TypeScript Tailwind.' }]
  });
  const code = msg.content[0].text.match(/```(?:tsx|typescript)\n([\s\S]*?)```/);
  if (code) {
    fs.writeFileSync('app/quiz/page.tsx', code[1]);
    console.log('✅ app/quiz/page.tsx');
  }
})();
