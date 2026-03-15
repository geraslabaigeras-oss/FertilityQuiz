#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const anthropic = new Anthropic({
  apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim()
});

async function useOpusProper() {
  console.log('🤖 Using Claude Opus 4 properly (non-streaming)...\n');

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 8000,
    messages: [{
      role: 'user',
      content: `Build a PREMIUM fertility quiz landing page.

Requirements:
- Claira branding (elegant serif logo)
- "Am I Wasting My Fertile Years?" headline
- Real social proof: "12,847 women took this"
- Benefits: 💫 Personalized timeline, 🚩 Red flags, 📊 Real data
- BIG purple gradient CTA button → /quiz
- Trust badges: 100% Anonymous, 2 minutes
- Smooth Framer Motion animations
- Purple/pink gradient background
- Featured badges: r/relationships, r/TwoXChromosomes

Generate app/page.tsx as Next.js + TypeScript + Tailwind + Framer Motion.`
    }]
  });

  console.log('✅ Response received\n');
  
  const content = message.content[0].text;
  fs.writeFileSync('opus-proper-response.md', content);
  
  const codeMatch = content.match(/```(?:tsx|typescript)\n([\s\S]*?)```/);
  if (codeMatch) {
    fs.writeFileSync('app/page.tsx', codeMatch[1]);
    console.log('✅ Wrote app/page.tsx\n');
    console.log('Run: npm run build');
  }
}

useOpusProper().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
