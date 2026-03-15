#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });

(async () => {
  console.log('Building landing with Opus 4...');
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: 'Build app/page.tsx for Claira fertility quiz landing. Claira logo (serif), "Am I Wasting My Fertile Years?", Reddit quote with upvotes, "12,847 women", benefits 💫🚩📊, BIG gradient button to /quiz, trust badges, purple/pink gradient bg, Framer Motion. Next.js + TypeScript + Tailwind.' }]
  });
  const code = msg.content[0].text.match(/```(?:tsx|typescript)\n([\s\S]*?)```/);
  if (code) {
    fs.writeFileSync('app/page.tsx', code[1]);
    console.log('✅ app/page.tsx');
  }
})();
