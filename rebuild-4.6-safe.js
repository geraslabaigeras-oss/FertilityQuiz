#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });
const reddit = JSON.parse(fs.readFileSync('reddit_fertility_quotes.json', 'utf-8'));

(async () => {
  console.log('🎨 Rebuilding with Opus 4.6 (safe version)...\n');
  
  // Results only (landing and quiz already done)
  console.log('Building results...');
  const results = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: `Build complete app/results/page.tsx for Next.js fertility quiz results:

Requirements:
- "use client" at top
- Import: useSearchParams from next/navigation, useState, useEffect, Suspense from react
- Import Framer Motion, shadcn Button/Card/Input, Lucide icons
- ResultsContent function that uses useSearchParams
- SVG chart showing fertility curve from age 25-50 (green/yellow/red zones)
- Red vertical line at user's current age
- 3 colored cards: Optimal (green), Good (yellow), Declining (red)
- One insight card with purple background
- Paywall section: Lock icon, heading, 6 checkmarks, blurred preview card, email input, crossed-out $49.99 then $29.99, gradient CTA button, social proof
- Export default function wrapping in Suspense
- Purple/pink theme matching rest of app
- Complete, working TypeScript code

Generate ONLY the TSX code, nothing else.` }]
  });
  
  const text = results.content[0].text;
  const match = text.match(/```(?:tsx|typescript)?\n([\s\S]*?)```/);
  
  if (match) {
    fs.writeFileSync('app/results/page.tsx', match[1]);
    console.log('✅ app/results/page.tsx written');
  } else {
    fs.writeFileSync('opus-results-response.txt', text);
    console.log('⚠️  No code block found, saved response to opus-results-response.txt');
  }
})();
