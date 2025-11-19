<template>
  <div class="welcome-container">
    <div class="animated-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <div class="content">
      <div class="hearts-animation">
        <span class="heart" v-for="i in 5" :key="i">💕</span>
      </div>

      <h1 class="title gradient-text">Happy Birthday</h1>
      <h2 class="subtitle">Mi Amor ❤️</h2>

      <p class="message">
        Welcome to something special, created just for you
      </p>

      <p class="description">
        I've crafted this experience to tell you our story, have meaningful conversations, and celebrate the wonderful person you are.
      </p>

      <div class="features">
        <div class="feature-item">
          <span class="feature-icon">📖</span>
          <span class="feature-text">Storytelling</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">💬</span>
          <span class="feature-text">Smart AI Chat</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🎉</span>
          <span class="feature-text">Celebration</span>
        </div>
      </div>

      <button class="btn-next" @click="$emit('next')">
        Let's Begin ✨
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
  emits: ['next'],
}
</script>

<style scoped>
.welcome-container {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
}

.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: -100px;
  left: -100px;
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  bottom: -50px;
  right: 50px;
  animation: float 15s ease-in-out infinite 2s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  top: 50%;
  right: -100px;
  animation: float 18s ease-in-out infinite 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  25% {
    transform: translateY(-30px) translateX(20px);
  }
  50% {
    transform: translateY(-60px) translateX(-20px);
  }
  75% {
    transform: translateY(-30px) translateX(20px);
  }
}

.content {
  text-align: center;
  animation: fadeIn 1s ease-out;
  max-width: 600px;
  position: relative;
  z-index: 2;
}

.hearts-animation {
  font-size: 4rem;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.heart {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

.heart:nth-child(1) { animation-delay: 0s; }
.heart:nth-child(2) { animation-delay: 0.2s; }
.heart:nth-child(3) { animation-delay: 0.4s; }
.heart:nth-child(4) { animation-delay: 0.6s; }
.heart:nth-child(5) { animation-delay: 0.8s; }

.title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 10px;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.8s ease-out;
}

.subtitle {
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 30px;
  font-weight: 300;
  animation: slideIn 0.8s ease-out 0.2s both;
}

.message {
  font-size: 1.3rem;
  color: white;
  margin-bottom: 20px;
  animation: fadeIn 1s ease-out 0.4s both;
}

.description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
  animation: fadeIn 1s ease-out 0.6s both;
}

.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
  animation: fadeIn 1s ease-out 0.8s both;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.feature-icon {
  font-size: 2rem;
  display: block;
}

.feature-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  font-weight: 600;
}

.btn-next {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 2px solid white;
  padding: 16px 60px;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
  font-weight: 700;
  animation: fadeIn 1s ease-out 1s both;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-next:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.6);
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.btn-next:active {
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.8rem;
  }

  .hearts-animation {
    font-size: 2.5rem;
    gap: 10px;
  }

  .btn-next {
    padding: 14px 45px;
    font-size: 1rem;
  }

  .features {
    gap: 20px;
  }
}
</style>
