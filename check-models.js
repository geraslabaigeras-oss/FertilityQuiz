#!/usr/bin/env node
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const anthropic = new Anthropic({ apiKey: fs.readFileSync('/root/.anthropic_api_key', 'utf-8').trim() });

(async () => {
  console.log('Testing claude-opus-4-20250514 vs claude-opus-4-6...\n');
  
  try {
    const msg = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 100,
      messages: [{ role: 'user', content: 'What model are you?' }]
    });
    console.log('✅ claude-opus-4-6 works!');
    console.log('Response:', msg.content[0].text);
  } catch (e) {
    console.log('❌ claude-opus-4-6 error:', e.message);
    
    // Try the other one
    try {
      const msg2 = await anthropic.messages.create({
        model: 'claude-opus-4-20250514',
        max_tokens: 100,
        messages: [{ role: 'user', content: 'What model are you?' }]
      });
      console.log('\n✅ claude-opus-4-20250514 works!');
      console.log('Response:', msg2.content[0].text);
    } catch (e2) {
      console.log('❌ claude-opus-4-20250514 also failed:', e2.message);
    }
  }
})();
