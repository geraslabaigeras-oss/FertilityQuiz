#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });

(async () => {
  console.log('Building results with Opus 4...');
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 6000,
    messages: [{ role: 'user', content: 'Build app/results/page.tsx: useSearchParams for data, SVG fertility curve chart (green/yellow/red zones), 3 timeline cards, insight card, then paywall with blurred preview, email input, $49.99→$29.99, gradient CTA. Next.js TypeScript Tailwind Framer Motion. Use Suspense wrapper.' }]
  });
  const code = msg.content[0].text.match(/```(?:tsx|typescript)\n([\s\S]*?)```/);
  if (code) {
    fs.writeFileSync('app/results/page.tsx', code[1]);
    console.log('✅ app/results/page.tsx');
  }
})();
