#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim()
});

async function buildQuizWithOpus() {
  console.log('🤖 Calling Claude Opus to build the fertility quiz...\n');

  let fullContent = '';

  const stream = await anthropic.messages.stream({
    model: 'claude-opus-4-20250514',
    max_tokens: 16000,
    messages: [{
      role: 'user',
      content: `You are building a viral fertility quiz app. I need you to generate the complete React/TypeScript code for a multi-page quiz flow.

CONTEXT:
- Landing page already exists (looks beautiful)
- User clicks "Take the 2-Minute Assessment" button
- Need 10-question quiz with progress bar
- Results page with personalized fertility timeline
- Based on research of 2,400+ women's Reddit stories

QUIZ QUESTIONS (in order):
1. Age (number input, 18-50)
2. Current relationship status (single/dating/committed/engaged/married)
3. If in relationship: How long? (months/years)
4. Have you discussed having kids with your partner? (yes/no/not applicable)
5. Does your partner want kids? (yes/no/unsure/not applicable)
6. Anxiety level about fertility timeline (1-10 slider)
7. Mother's age when she had her first child (number, family history predictor)
8. Mother's age at menopause (number, 90% accuracy predictor)
9. Any known fertility issues in family? (yes/no/unsure)
10. Biggest concern (multiple choice: running out of time/partner not ready/career priorities/financial stability/not sure if I want kids)

BETWEEN QUESTIONS - Show insights every 2-3 questions:
- "Women who discuss kids by year 2: 82% get married within 5 years"
- "Your fertility peaks at 32, drops 35% after age 35"
- "90% of women experience menopause within 5 years of their mother's age"

RESULTS PAGE should show:
- Personalized fertility timeline (based on mother's menopause age - 10 years = likely fertility decline start)
- Relationship red flags if applicable (partner unsure + been together 3+ years)
- Comparison to other women in their age bracket
- CTA: "Get Your Full Report" → Paywall ($29.99)

TECH STACK:
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- shadcn/ui components
- Dark theme (bg-zinc-950, text-zinc-50, accent rose-500)

TONE:
- Empowering, not fear-mongering
- Use "knowledge is power" framing
- Data-driven but compassionate
- Slightly buzzy/viral (like those personality quizzes people share)

Generate:
1. app/quiz/page.tsx - Main quiz component with all 10 questions
2. app/results/page.tsx - Results page with timeline visualization
3. components/QuizProgress.tsx - Progress bar component
4. lib/quizLogic.ts - Logic for calculating results

Make it production-ready, beautiful, and conversion-optimized. Use smooth animations between questions.`
    }]
  });

  stream.on('text', (text) => {
    process.stdout.write(text);
    fullContent += text;
  });

  await stream.finalMessage();

  console.log('\n\n✅ Response received from Claude Opus\n');
  
  const content = fullContent;
  
  // Save the full response
  fs.writeFileSync('/root/.openclaw/workspace/fertility-final/opus-response.md', content);
  console.log('📝 Full response saved to opus-response.md\n');
  
  // Parse out code blocks and save them
  const codeBlockRegex = /```(?:typescript|tsx|ts|javascript|jsx|js)?\n([\s\S]*?)```/g;
  let match;
  let fileIndex = 0;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    fileIndex++;
    const code = match[1];
    
    // Try to detect filename from comments or context
    const filenameMatch = code.match(/\/\/\s*(?:File:|Filename:)?\s*(.+\.tsx?)/i);
    
    if (filenameMatch) {
      const filename = filenameMatch[1].trim();
      console.log(`📄 Extracted: ${filename}`);
    } else {
      console.log(`📄 Code block ${fileIndex} extracted`);
    }
  }
  
  console.log('\n✨ Done! Review opus-response.md and extract the files.');
  console.log('Then run: npm run dev');
}

buildQuizWithOpus().catch(console.error);
