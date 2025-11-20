// AI Service for birthday chatbot
// REAL ChatGPT integration with message selection feature

const MESSAGE_OPTIONS = {
  love: [
    "I love you because you're not just my partner, but my best friend. Even though distance separates us, you're always in my heart. Every call, every message brings you closer to me. You understand me in ways no one else ever could. Can't wait to hold you soon. ❤️",
    "What makes me love you? It's knowing that no matter how many miles are between us, nothing can diminish what we have. Your love reaches me across every distance. And soon, very soon, I'll get to love you in person again. 💕",
    "You want to know why I love you? Because when I'm with you virtually, I feel connected in the deepest way. You make every moment count, and I'm counting down the days until I can finally be by your side and never let go. ✨"
  ],
  story: [
    "Our story is one of my favorite things. From the moment we met, I knew you were worth the distance. Every chapter we write together - from our first kiss to this moment - means everything. And the best chapter is coming soon when we're finally together. 📖💕",
    "I could tell you about the day we met, but what matters more is every day since, and the days to come. You've turned my life into the most beautiful story. Happy birthday to the love of my life - can't wait to celebrate many more in person. 🌹",
  ],
  funny: [
    "You make me laugh so hard, even through a screen! Your sense of humor keeps me going through the lonely nights. Soon I'll get to laugh with you face-to-face, and I cannot wait for that! 😄",
    "You know what's funny? How completely in love with you I am, despite the distance. The countdown timer on my phone, the way I check flights - yeah, that's how obsessed I am. Happy birthday to my favorite person to dream about being with! 🎉",
  ],
  memory: [
    "I cherish every memory we've made, from our first video call to now. These moments keep me going. Soon we'll create new memories together in person - the kind we'll relive forever. 💫",
    "Some of my favorite memories are those late-night calls where we just existed together. Every moment matters because it's us. And soon, we'll have memories of waking up together, which I cannot wait for. ❤️",
  ],
  future: [
    "I dream about our future together - and it starts the moment we finally meet. I see us making up for lost time, creating adventures, and never being apart again. The countdown to being with you is everything. 🌟",
    "Your dreams are my dreams. And my biggest dream right now? Closing this distance and building our life together in person. You give me hope for an amazing future, and it's coming soon. ✨",
  ],
  beautiful: [
    "You're beautiful inside and out. And I can't wait to see that beautiful smile in person, to look into your eyes without a screen between us. Soon, I promise. 🌹",
    "You're most beautiful when you're being yourself - which I get to see even through the distance. But imagine how much more beautiful everything will be when we're finally together. Soon, my love. 💕",
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
