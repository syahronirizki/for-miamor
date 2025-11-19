// AI Service for birthday chatbot
// REAL ChatGPT integration with message selection feature

const MESSAGE_OPTIONS = {
  love: [
    "I love you because you're not just my partner, but my best friend. You understand me in ways no one else ever could. You celebrate my dreams, support my challenges, and make every ordinary day feel extraordinary. That's why I love you. ❤️",
    "What makes me love you? It's the little things - the way you laugh at my jokes, how you hold my hand, the warmth in your eyes when you look at me. But it's also the big things - your strength, your kindness, your beautiful heart. I love all of it. 💕",
    "You want to know why I love you? Because when I'm with you, I feel like I'm home. You make me feel safe, cherished, and completely yourself. You bring out the best in me and love me at my worst. That's unconditional, and that's why I love you. ✨"
  ],
  story: [
    "Our story is one of my favorite things. From the moment we met, I knew you were different. Every chapter we write together - from our first kiss to this moment celebrating you - is more beautiful than the last. I can't wait to see what comes next. 📖💕",
    "I could tell you about the day we met, but what matters more is every day since. It's been a journey of discovery, laughter, and love. You've turned my life into the most beautiful story. Happy birthday to the love of my life. 🌹",
  ],
  funny: [
    "You make me laugh so hard sometimes I forget to breathe! Your sense of humor is one of my favorite things about you. The way you can turn any moment into something hilarious... that's a superpower. Thank you for making me smile every single day. 😄",
    "You know what's funny? How completely and utterly in love with you I am. Like, embarrassingly in love. The kind of in love that makes me do silly things and smile like an idiot. Happy birthday to my favorite person to be ridiculous with! 🎉",
  ],
  memory: [
    "I have so many beautiful memories with you. I remember the day we first said 'I love you' - my heart jumped so high! I remember every adventure we've been on, every moment we've shared. These memories are treasures I'll cherish forever. 💫",
    "Some of my favorite memories are the quiet ones - just you and me, no need to say anything because everything felt perfect. Other memories are loud and wild and absolutely crazy. All of them matter to me. All of them made me fall more in love with you. ❤️",
  ],
  future: [
    "I dream about our future together. I see a life filled with adventures, laughter, and endless moments of love. I see us growing old together, still holding hands, still discovering new things about each other. The future with you is the most beautiful thing I can imagine. 🌟",
    "Your dreams are my dreams now. Whatever you want to achieve, I believe in you completely. I can't wait to see you succeed, grow, and shine. And I'll be right there beside you, cheering you on. Our future is going to be amazing. ✨",
  ],
  beautiful: [
    "You're beautiful inside and out. Your appearance is stunning, but what really takes my breath away is your beautiful soul. Your kindness, your compassion, your strength - that's what makes you truly beautiful. 🌹",
    "You have no idea how beautiful you are when you're passionate about something. When you talk about what you love, your whole face lights up. That's when you're most beautiful - when you're being completely yourself. 💕",
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
