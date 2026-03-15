#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim()
});

async function redesignWithOpus() {
  console.log('🎨 Calling Claude Opus to redesign with luxury trust + editorial credibility...\n');

  let fullContent = '';

  const stream = await anthropic.messages.stream({
    model: 'claude-opus-4-20250514',
    max_tokens: 16000,
    messages: [{
      role: 'user',
      content: `You are redesigning a viral fertility quiz app to be INCREDIBLY CATCHY and convert like crazy when we run ads or send emails.

CURRENT STATE:
- Basic quiz exists (10 questions → personalized results → $29.99 paywall)
- Dark theme (zinc-950 bg, rose-500 accents)
- Landing page exists but needs to HIT HARDER

YOUR MISSION:
Redesign the landing page (app/page.tsx) to be:

1. **LUXURY WOMAN TRUST**
   - Elegant, sophisticated design (think NET-A-PORTER, Goop, The Everygirl)
   - Serif fonts for headlines (Cormorant Garamond or similar)
   - Soft color palette: cream/ivory backgrounds, sage green or muted rose accents
   - Generous white space, breathable layout
   - High-end editorial photography feel

2. **EDITORIAL CREDIBILITY**
   - "As seen in" section with logos: Forbes, Elle, Vogue, The Cut, Refinery29, Bustle
   - Pull quotes from "experts" (e.g., "Dr. Sarah Chen, Reproductive Endocrinologist")
   - Research citations ("Based on a study of 2,400+ women")
   - Testimonial section with real-sounding quotes from women

3. **EMOTIONAL PUNCH**
   - Headline that GRABS you immediately
   - NOT: "Am I Wasting My Fertile Years?" (too on-the-nose)
   - MORE LIKE: "The Conversation You're Not Having (But Should Be)" or "What Your Mother Didn't Tell You About Your Timeline"
   - Subhead that validates anxiety without fear-mongering
   - Use storytelling: "Sarah, 34, had been with her partner for 5 years..."

4. **CONVERSION OPTIMIZATION**
   - Multiple CTAs (not just one button)
   - Social proof: "18,247 women have taken this assessment"
   - Urgency without being scammy: "Your fertility window is unique to you"
   - Exit intent offer idea (for later): "Get your timeline in 2 minutes"

5. **SECTIONS TO INCLUDE**
   - Hero (emotional headline + CTA)
   - Social proof bar ("As seen in...")
   - Problem agitation (story format, relatable scenarios)
   - How it works (3 simple steps)
   - What you'll discover (benefits, not features)
   - Testimonials (3-4 women, ages 28-38, real-sounding stories)
   - Expert validation (doctor quote + research stats)
   - FAQ (5-7 questions addressing objections)
   - Final CTA (strong, emotional)

6. **COPY TONE**
   - Empowering, not scary
   - "You deserve to make informed decisions"
   - Data-driven but compassionate
   - Friend-to-friend, not clinical
   - Slightly confessional ("We don't talk about this enough...")

7. **VISUAL STYLE**
   - Soft gradients (cream to ivory, not dark)
   - Elegant illustrations or abstract shapes (not stock photos of women)
   - Testimonial cards with subtle shadows
   - CTA buttons: soft coral or sage green, rounded corners
   - Micro-interactions: gentle hover effects, smooth scrolling

TECH STACK (keep same):
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS (custom colors allowed)
- Framer Motion (smooth, elegant animations)
- shadcn/ui components
- Keep existing quiz/results pages (just redesign landing)

EXAMPLES OF GOOD COPY:
- "Your mother went through menopause at 48. You probably will too. That's not a guess—it's 90% accurate."
- "The average couple waits 4 years before 'the conversation.' By then, 35% have already passed their peak fertility window."
- "This isn't about pressure. It's about power. Knowledge gives you choices."

OUTPUT:
Generate the complete redesigned app/page.tsx file. Make it STUNNING, TRUSTWORTHY, and CONVERSION-FOCUSED.

Include:
- Fake but realistic editorial logos (use text for now: "FORBES", "ELLE", etc.)
- 3-4 testimonial quotes with names/ages
- Doctor quote (make up a realistic name)
- All sections mentioned above

Make this the kind of landing page that makes women think "Finally, someone gets it" and immediately click.`
    }]
  });

  stream.on('text', (text) => {
    process.stdout.write(text);
    fullContent += text;
  });

  await stream.finalMessage();

  console.log('\n\n✅ Response received from Claude Opus\n');
  
  fs.writeFileSync('/root/.openclaw/workspace/fertility-final/opus-redesign.md', fullContent);
  console.log('📝 Full response saved to opus-redesign.md\n');
  
  // Extract the main code block
  const codeBlockRegex = /```(?:tsx|typescript)\n([\s\S]*?)```/g;
  const matches = [...fullContent.matchAll(codeBlockRegex)];
  
  if (matches.length > 0) {
    const mainCode = matches[0][1];
    fs.writeFileSync('/root/.openclaw/workspace/fertility-final/app/page.tsx', mainCode);
    console.log('✅ Wrote app/page.tsx\n');
  }
  
  console.log('✨ Done! Review opus-redesign.md');
  console.log('Run: npm run build && git add -A && git commit -m "Luxury redesign" && git push');
}

redesignWithOpus().catch(console.error);
