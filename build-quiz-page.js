#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const anthropic = new Anthropic({
  apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim()
});

async function buildQuiz() {
  console.log('🎨 Building actual quiz page with Opus...\n');

  let fullContent = '';

  const stream = await anthropic.messages.stream({
    model: 'claude-opus-4-20250514',
    max_tokens: 16000,
    messages: [{
      role: 'user',
      content: `Build the QUIZ page (app/quiz/page.tsx) for Claira.

The landing page has "START YOUR FREE ASSESSMENT" button that goes to /quiz.

Build the quiz flow:

1. **Question-by-question flow** (10 questions total)
2. **Progress bar** showing 3/10 etc
3. **Smooth animations** between questions (Framer Motion)
4. **Mini-insights** after certain questions ("90% of women...")
5. **Multiple choice buttons** for options questions
6. **Number input** for age/anxiety questions
7. After question 10 → Navigate to /results with answers in URL params

QUESTIONS (same as v1):
1. Age (number input)
2. Relationship status (options)
3. How long together (options)
4. Discussed kids? (options)
5. Partner wants kids? (options)
6. Anxiety 1-10 (number input)
7. Mother's first child age (options)
8. Mother's menopause age (options)
9. Family fertility issues (options)
10. Biggest concern (options)

DESIGN:
- Purple gradient background
- White card for quiz
- Claira logo top left
- Progress bar at top
- Smooth fade between questions
- Disabled "Next" button until answer selected
- Framer Motion animations

Generate app/quiz/page.tsx as a complete Next.js page.`
    }]
  });

  stream.on('text', (text) => {
    process.stdout.write(text);
    fullContent += text;
  });

  await stream.finalMessage();

  console.log('\n\n✅ Done\n');
  
  const codeMatch = fullContent.match(/```(?:tsx|typescript)\n([\s\S]*?)```/);
  if (codeMatch) {
    fs.writeFileSync('app/quiz/page.tsx', codeMatch[1]);
    console.log('✅ Wrote app/quiz/page.tsx\n');
  }
}

buildQuiz().catch(console.error);
