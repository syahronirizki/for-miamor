<template>
  <div class="app-container">
    <div class="stars-background">
      <div class="star" v-for="i in 100" :key="i"></div>
    </div>
    
    <component :is="currentComponent" @next="goToNext" @back="goToBack"></component>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Welcome from './components/Welcome.vue'
import Story from './components/Story.vue'
import AIChat from './components/AIChat.vue'
import Birthday from './components/Birthday.vue'

export default {
  name: 'App',
  components: {
    Welcome,
    Story,
    AIChat,
    Birthday,
  },
  setup() {
    const currentStep = ref(0)
    
    const components = ['Welcome', 'Story', 'AIChat', 'Birthday']
    
    const currentComponent = computed(() => components[currentStep.value])
    
    const goToNext = () => {
      if (currentStep.value < components.length - 1) {
        currentStep.value++
      }
    }
    
    const goToBack = () => {
      if (currentStep.value > 0) {
        currentStep.value--
      }
    }
    
    return {
      currentComponent,
      goToNext,
      goToBack,
      currentStep,
    }
  },
}
</script>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}
</style>
