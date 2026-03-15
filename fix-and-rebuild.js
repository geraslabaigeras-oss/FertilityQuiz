#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });

(async () => {
  console.log('🎨 Rebuilding results page (simplified)...\n');
  
  const msg = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: `Build app/results/page.tsx for Claira fertility quiz.

REQUIREMENTS:
- Cream/terracotta/charcoal color scheme (NO purple/pink)
- Editorial luxury design (like The Cut, not SaaS)
- useSearchParams to get answers (wrap in Suspense)
- Visual fertility chart using recharts library (import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts')
- Chart data: ages 25-50 with fertility percentages
- Green/amber/red color zones
- 3 summary cards
- Insight card with real stat
- Paywall: heading, 6 checkmarks, blurred preview, email, $49→$29, CTA button, social proof

IMPORTANT: Use recharts for the chart, NOT manual SVG. Keep code simple.
Generate complete Next.js TypeScript code.` }]
  });
  
  const code = msg.content[0].text.match(/\`\`\`(?:tsx|typescript)?\s*\n([\s\S]*?)\`\`\`/)?.[1];
  if (code) {
    fs.writeFileSync('app/results/page.tsx', code);
    console.log('✅ app/results/page.tsx written');
  } else {
    console.log('❌ No code found');
  }
})();
