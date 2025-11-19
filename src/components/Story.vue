<template>
  <div class="story-container">
    <button class="btn-back" @click="$emit('back')">← Back</button>

    <div class="story-content">
      <div class="story-header">
        <h2 class="gradient-text">✨ Our Beautiful Story ✨</h2>
      </div>

      <div class="story-scenes">
        <div
          v-for="(scene, index) in scenes"
          :key="index"
          :class="['scene', { 'active': currentScene === index }]"
        >
          <div class="scene-image-large">{{ scene.image }}</div>
          <div class="scene-header-small">
            <div class="scene-number">Part {{ index + 1 }}</div>
            <div class="scene-emoji">{{ scene.emoji }}</div>
          </div>
          <h3>{{ scene.title }}</h3>
          <p>{{ scene.content }}</p>
        </div>
      </div>

      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: ((currentScene + 1) / scenes.length * 100) + '%' }"></div>
      </div>

      <div class="scene-navigation">
        <button
          class="btn-nav btn-prev"
          @click="previousScene"
          :disabled="currentScene === 0"
        >
          ← Previous
        </button>

        <span class="scene-indicator">
          {{ currentScene + 1 }} / {{ scenes.length }}
        </span>

        <button
          class="btn-nav btn-next"
          @click="nextScene"
          :disabled="currentScene === scenes.length - 1"
        >
          Next →
        </button>
      </div>

      <button
        v-if="currentScene === scenes.length - 1"
        class="btn-continue"
        @click="$emit('next')"
      >
        Let's Chat 💬
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'StorySection',
  emits: ['next', 'back'],
  setup() {
    const currentScene = ref(0)

    const scenes = [
      {
        emoji: '❤️',
        title: 'The Day We Met',
        content: 'Do you remember that moment? When our eyes first met, I knew something magical was happening. You had this light about you that drew me in completely. From that very first moment, you changed everything. Every day with you since has been a gift I never take for granted.',
        image: '🌅',
      },
      {
        emoji: '💕',
        title: 'Growing Together',
        content: 'We\'ve built the most beautiful memories together - from late-night conversations to spontaneous adventures. You\'ve seen me at my lowest and lifted me up. You celebrate my wins like they\'re your own. Together, we\'ve grown into better versions of ourselves. That\'s the power of what we have.',
        image: '🌈',
      },
      {
        emoji: '✨',
        title: 'Your Light',
        content: 'Your smile brightens my darkest days. Your kindness inspires me to be better. Your dreams fuel my passion. The way you love without hesitation, the strength you show facing challenges, the grace you carry - it all makes me fall for you deeper every single day.',
        image: '⭐',
      },
      {
        emoji: '🎁',
        title: 'Today & Forever',
        content: 'This is YOUR day - a celebration of the incredible human you are. You deserve every happiness, every dream fulfilled, every moment of joy. Thank you for being you, for sharing this journey with me, for loving me so beautifully. Today we celebrate not just your birthday, but YOU. I love you more than words could ever express.',
        image: '🎉',
      },
    ]

    const nextScene = () => {
      if (currentScene.value < scenes.length - 1) {
        currentScene.value++
      }
    }

    const previousScene = () => {
      if (currentScene.value > 0) {
        currentScene.value--
      }
    }

    return {
      currentScene,
      scenes,
      nextScene,
      previousScene,
    }
  },
}
</script>

<style scoped>
.story-container {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.btn-back {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  z-index: 10;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-3px);
}

.story-content {
  max-width: 700px;
  width: 100%;
  position: relative;
}

.story-header {
  text-align: center;
  margin-bottom: 50px;
}

.story-header h2 {
  font-size: 2.5rem;
  animation: fadeIn 0.8s ease-out;
}

.story-scenes {
  position: relative;
  height: 450px;
  margin-bottom: 40px;
}

.scene {
  position: absolute;
  width: 100%;
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  background: rgba(255, 255, 255, 0.08);
  padding: 50px 40px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.scene.active {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.scene-image-large {
  font-size: 6rem;
  text-align: center;
  margin-bottom: 30px;
  animation: float 3s ease-in-out infinite;
}

.scene-header-small {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.scene-number {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}

.scene-emoji {
  font-size: 1.5rem;
}

.scene h3 {
  font-size: 2rem;
  color: white;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
}

.scene p {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.8;
  text-align: center;
}

.progress-bar {
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin-bottom: 30px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  transition: width 0.6s ease;
}

.scene-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 15px;
}

.btn-nav {
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%);
  color: white;
  border: 2px solid rgba(79, 172, 254, 0.5);
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.95rem;
}

.btn-nav:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.4) 0%, rgba(0, 242, 254, 0.4) 100%);
  border-color: rgba(79, 172, 254, 1);
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(79, 172, 254, 0.3);
}

.btn-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.scene-indicator {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 700;
  min-width: 60px;
  text-align: center;
}

.btn-continue {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 2px solid white;
  padding: 15px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 700;
  animation: fadeIn 0.8s ease-out;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.btn-continue:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@media (max-width: 600px) {
  .story-container {
    padding: 20px;
  }

  .story-header h2 {
    font-size: 1.8rem;
  }

  .scene {
    padding: 30px 25px;
    min-height: 400px;
  }

  .scene-image-large {
    font-size: 4rem;
  }

  .scene h3 {
    font-size: 1.4rem;
  }

  .scene p {
    font-size: 0.95rem;
  }

  .scene-navigation {
    flex-wrap: wrap;
  }

  .btn-nav {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

/* Extra small devices (320px - 480px) */
@media (max-width: 480px) {
  .story-container {
    padding: 15px;
  }

  .btn-back {
    padding: 10px 15px;
    font-size: 0.85rem;
  }

  .story-header {
    margin-bottom: 30px;
  }

  .story-header h2 {
    font-size: 1.4rem;
  }

  .story-scenes {
    height: auto;
    margin-bottom: 30px;
  }

  .scene {
    padding: 25px 20px;
    min-height: 350px;
    border-radius: 20px;
  }

  .scene-image-large {
    font-size: 3.5rem;
    margin-bottom: 20px;
  }

  .scene-header-small {
    gap: 12px;
    margin-bottom: 15px;
  }

  .scene-number {
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }

  .scene-emoji {
    font-size: 1.2rem;
  }

  .scene h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  .scene p {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .progress-bar {
    height: 2px;
    margin-bottom: 20px;
  }

  .scene-navigation {
    gap: 10px;
    margin-bottom: 20px;
  }

  .btn-nav {
    padding: 9px 15px;
    font-size: 0.8rem;
    flex: 1;
  }

  .scene-indicator {
    font-size: 0.85rem;
    min-width: 50px;
  }

  .btn-continue {
    padding: 12px;
    font-size: 0.95rem;
    border-radius: 20px;
  }
}

/* Small tablets (481px - 768px) */
@media (max-width: 768px) and (min-width: 481px) {
  .story-container {
    padding: 18px;
  }

  .story-header h2 {
    font-size: 1.6rem;
  }

  .scene {
    padding: 28px 22px;
    min-height: 380px;
  }

  .scene-image-large {
    font-size: 4.5rem;
  }

  .scene h3 {
    font-size: 1.3rem;
  }

  .scene p {
    font-size: 0.98rem;
  }

  .btn-nav {
    padding: 10px 18px;
    font-size: 0.88rem;
  }
}

/* Landscape orientation */
@media (max-height: 500px) and (orientation: landscape) {
  .story-container {
    padding: 10px;
  }

  .story-header {
    margin-bottom: 15px;
  }

  .story-header h2 {
    font-size: 1.2rem;
  }

  .story-scenes {
    height: 250px;
    margin-bottom: 15px;
  }

  .scene {
    padding: 15px;
    min-height: 250px;
  }

  .scene-image-large {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .scene h3 {
    font-size: 1rem;
    margin-bottom: 8px;
  }

  .scene p {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .btn-nav {
    padding: 6px 12px;
    font-size: 0.75rem;
  }

  .scene-indicator {
    font-size: 0.8rem;
  }
}
</style>
