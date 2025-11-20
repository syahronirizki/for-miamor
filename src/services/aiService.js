// AI Service for birthday chatbot
// REAL ChatGPT integration with message selection feature

const MESSAGE_OPTIONS = {
  love: [
    "I love you because you're not just my partner, but my best friend. Even though we're still in a long-distance relationship, you're always in my heart. Every call and message brings you closer to me. I can't wait for the day we finally meet in person — as soon as possible. ❤️",
    "What makes me love you? Knowing that no amount of miles can diminish what we have. Even while we're apart, your love reaches me every day. I'm counting down until we can be together again, as soon as we possibly can. 💕",
    "You want to know why I love you? Because even from afar you make my world brighter. These distance days only make me more certain that when we meet in person, it will be everything I've dreamed of — and I hope that happens as soon as possible. ✨"
  ],
  story: [
    "Our story is one of my favorite things. From the moment we met I knew you were worth the distance. Every chapter we write together — including these long-distance days — means everything. The best chapter will be when we finally meet in person as soon as possible. 📖💕",
    "I could tell you about the day we met, but what matters more are all the moments since, even the ones spent apart. You've turned my life into the most beautiful story, and I can't wait to continue it together the next time we're finally together in person. 🌹",
  ],
  funny: [
    "You make me laugh so hard, even through a screen! Your sense of humor gets me through the long-distance nights. I can't wait to laugh with you face-to-face as soon as we can be together. 😄",
    "Isn't it funny how we're totally in love despite the distance? The countdown on my phone and my flight searches are proof. Happy birthday to my favorite person to daydream about being with — see you in person as soon as possible! 🎉",
  ],
  memory: [
    "I cherish every memory we've made, from our first video call to our late-night chats. Those long-distance moments keep me going. I look forward to making new, in-person memories with you as soon as we can. 💫",
    "Some of my favorite memories are those nights we just existed together over the phone. Every moment matters because it's us, even when apart. I can't wait for the mornings we'll share in person as soon as possible. ❤️",
  ],
  future: [
    "I dream about our future together — and it begins the moment we finally meet in person. I see us making up for lost time, creating adventures, and never being apart again. Let's make that future happen as soon as we can. 🌟",
    "Your dreams are my dreams. My biggest wish right now is to close this distance and build our life together in person as soon as possible. You give me hope for an amazing future, and I can't wait to start it with you. ✨",
  ],
  beautiful: [
    "You're beautiful inside and out, and I can't wait to see that smile in person without a screen between us. I hope that happens as soon as we can be together. 🌹",
    "You're most beautiful when you're yourself — which I get to see even from afar. Imagine how much more beautiful everything will be when we're finally together in person, as soon as possible. 💕",
  ],
};

export const AIService = {
  // Detect question type and return available message options
  getMessageOptions(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    const isLoveQuestion = lowerMessage.includes('why') && lowerMessage.includes('love') && (lowerMessage.includes('you') || lowerMessage.includes('me'));
    const isStoryQuestion = (lowerMessage.includes('tell') || lowerMessage.includes('story')) && (lowerMessage.includes('our') || lowerMessage.includes('us'));
    const isFunnyQuestion = lowerMessage.includes('make') && lowerMessage.includes('laugh');
    const isMemoryQuestion = lowerMessage.includes('favorite') && lowerMessage.includes('memory');
    const isFutureQuestion = (lowerMessage.includes('dream') || lowerMessage.includes('future')) && (lowerMessage.includes('we') || lowerMessage.includes('us') || lowerMessage.includes('our'));
    const isBeautifulQuestion = lowerMessage.includes('beautiful') && (lowerMessage.includes('you') || lowerMessage.includes('me'));

    if (isLoveQuestion) {
      return { category: 'love', options: MESSAGE_OPTIONS.love };
    } else if (isStoryQuestion) {
      return { category: 'story', options: MESSAGE_OPTIONS.story };
    } else if (isFunnyQuestion) {
      return { category: 'funny', options: MESSAGE_OPTIONS.funny };
    } else if (isMemoryQuestion) {
      return { category: 'memory', options: MESSAGE_OPTIONS.memory };
    } else if (isFutureQuestion) {
      return { category: 'future', options: MESSAGE_OPTIONS.future };
    } else if (isBeautifulQuestion) {
      return { category: 'beautiful', options: MESSAGE_OPTIONS.beautiful };
    }
    
    return null; // No template match
  },

  async chat(userMessage, conversationHistory = []) {
    console.log('🤖 Starting AI Chat Service...');
    console.log('User Message:', userMessage);
    
    try {
      console.log('🔄 Attempting to use AI model...');
      const response = await this.callFreeAI(userMessage, conversationHistory);
      console.log('✅ Got AI response');
      return response;
    } catch (error) {
      console.error('❌ AI Error:', error.message);
      return `❌ I couldn't reach my AI brain right now (API error: ${error.message}).\n\nPlease try again in a moment. The API may be rate-limited or temporarily unavailable.`;
    }
  },

  async callFreeAI(userMessage, conversationHistory) {
    // Call our backend proxy instead of HF API directly (avoids CORS issues)
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    
    console.log('🔐 Checking backend configuration...');
    console.log('📤 Calling backend API at:', backendUrl);

    try {
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
        }),
      });

      console.log('📥 Response Status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error Details:', errorData);
        
        // Handle rate limits
        if (response.status === 429 || response.status === 503) {
          const message = errorData.error || 'API rate limit reached. You can make requests again in a few moments.';
          throw new Error(`⏱️ Rate Limit: ${message}`);
        }
        
        throw new Error(`API Error (${response.status}): ${errorData.error || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('📦 Response Data:', data);

      if (!data.response) {
        throw new Error('❌ No content in response');
      }

      console.log('✅ AI Response:', data.response.substring(0, 100) + '...');
      return data.response;
    } catch (fetchError) {
      console.error('❌ Fetch Error:', fetchError.message);
      throw fetchError;
    }
  },

  formatMessageForLLM(messages) {
    // Format messages for Llama chat model
    return messages
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n') + '\nASSISTANT:';
  },

  generateBirthdayMessage(name = '') {
    const messages = [
      `Happy Birthday${name ? ` ${name}` : ''}! 🎂 Today we celebrate you and all the wonderful moments you bring to our lives. You are loved, admired, and truly special. May this year be filled with joy, laughter, and endless possibilities. ✨`,
      
      `To someone as amazing as you, on your special day: May your birthday be as beautiful as your heart is kind. May you receive all the love and happiness you so generously give to others. Here's to you! 💕`,
      
      `Another year older, another year wiser, and somehow more beautiful. That's you${name ? ` ${name}` : ''}! Today we celebrate everything you've accomplished and all the magic you bring into the world. ✨🎉`,
      
      `On your birthday, I want you to know: You matter. Your dreams matter. Your happiness matters. You are worthy of every good thing coming your way. Have the most incredible birthday ever! 🌹❤️`,
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  }
};
