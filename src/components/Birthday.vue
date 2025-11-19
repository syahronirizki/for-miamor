<template>
  <div class="birthday-container">
    <button class="btn-back" @click="$emit('back')">← Back</button>

    <div class="celebration">
      <div class="confetti" v-for="i in 60" :key="i"></div>

      <div class="birthday-content">
        <h1 class="celebration-title">🎉 HAPPY BIRTHDAY! 🎉</h1>

        <div class="cake-section">
          <div class="candle">🕯️</div>
          <div class="cake-body">🎂</div>
          <div class="candle">🕯️</div>
        </div>

        <div class="wishes-section glass">
          <h2>Why You're Amazing</h2>
          <div class="wishes-grid">
            <div v-for="(wish, index) in wishes" :key="index" class="wish-card">
              <div class="wish-emoji">{{ wish.emoji }}</div>
              <p>{{ wish.text }}</p>
            </div>
          </div>
        </div>

        <div class="final-message glass">
          <p class="love-quote">"I love you more than words could ever express."</p>
          <p class="signature">With all my love,</p>
          <p class="heart-signature">❤️ Your Love ❤️</p>
        </div>

        <div class="action-buttons">
          <button class="btn-restart" @click="restart">
            ✨ Start Over
          </button>
          <button class="btn-print" @click="printPage" title="Print this celebration">
            🖨️ Print
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'BirthdayCard',
  emits: ['back'],
  setup() {
    const copied = ref(false)

    const wishes = [
      {
        emoji: '🌟',
        text: 'May this year bring you endless joy and precious moments',
      },
      {
        emoji: '💖',
        text: 'You are loved more than you know by everyone around you',
      },
      {
        emoji: '🎊',
        text: 'Every moment with you is a priceless gift to me',
      },
      {
        emoji: '✨',
        text: 'Your dreams are beautiful and absolutely achievable',
      },
      {
        emoji: '🌈',
        text: 'You light up every room you walk into with your presence',
      },
      {
        emoji: '👑',
        text: 'You deserve to be treated like royalty every single day',
      },
    ]

    const restart = () => {
      window.location.reload()
    }

    const shareViaWhatsApp = () => {
      const message = encodeURIComponent(
        `🎉 Happy Birthday Mi Amor! ��\n\nI created a special celebration just for you:\n${window.location.href}\n\nWith all my love ❤️`
      )
      window.open(`https://wa.me/?text=${message}`, '_blank')
    }

    const shareViaFacebook = () => {
      const url = encodeURIComponent(window.location.href)
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        '_blank'
      )
    }

    const copyLink = () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 2000)
      })
    }

    const printPage = () => {
      window.print()
    }

    return {
      wishes,
      restart,
      shareViaWhatsApp,
      shareViaFacebook,
      copyLink,
      printPage,
      copied,
    }
  },
}
</script>

<style scoped>
.birthday-container {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
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
  z-index: 10;
  font-weight: 600;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.3);
}

.celebration {
  position: relative;
  width: 100%;
}

.confetti {
  position: fixed;
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
  pointer-events: none;
  animation: fall 4s linear forwards;
  border-radius: 50%;
}

@keyframes fall {
  to {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.confetti:nth-child(odd) {
  animation-duration: 3.5s;
}

.birthday-content {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
}

.celebration-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 30px;
  text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
  animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  letter-spacing: 2px;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

.cake-section {
  font-size: 8rem;
  margin: 50px 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  animation: bounce 1s ease-in-out infinite;
}

.candle {
  animation: flicker 1.5s ease-in-out infinite;
  font-size: 5rem;
}

.candle:nth-child(1) {
  animation-delay: 0.2s;
}

.candle:nth-child(3) {
  animation-delay: 0.1s;
}

@keyframes flicker {
  0%, 100% {
    opacity: 1;
    transform: translateY(0px);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-5px);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.wishes-section {
  margin: 40px 0;
  padding: 40px 30px;
  border-radius: 25px;
}

.wishes-section h2 {
  font-size: 1.8rem;
  color: white;
  margin-bottom: 30px;
  font-weight: 700;
}

.wishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
}

.wish-card {
  background: rgba(255, 255, 255, 0.08);
  padding: 25px 20px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
  animation: slideUp 0.6s ease-out both;
  cursor: pointer;
}

.wish-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.wish-card:nth-child(1) { animation-delay: 0.1s; }
.wish-card:nth-child(2) { animation-delay: 0.2s; }
.wish-card:nth-child(3) { animation-delay: 0.3s; }
.wish-card:nth-child(4) { animation-delay: 0.4s; }
.wish-card:nth-child(5) { animation-delay: 0.5s; }
.wish-card:nth-child(6) { animation-delay: 0.6s; }

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.wish-emoji {
  font-size: 2.5rem;
  margin-bottom: 12px;
  display: block;
}

.wish-card p {
  color: white;
  font-size: 0.9rem;
  line-height: 1.5;
  font-weight: 500;
}

.final-message {
  padding: 35px 30px;
  margin: 40px 0;
  border-radius: 25px;
  animation: fadeIn 1s ease-out 1.5s both;
}

.love-quote {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.3rem;
  line-height: 1.8;
  font-weight: 600;
  font-style: italic;
  margin-bottom: 20px;
}

.signature {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  margin-bottom: 10px;
}

.heart-signature {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 15px;
}

.sharing-section {
  padding: 35px 30px;
  margin: 40px 0;
  border-radius: 25px;
  animation: fadeIn 1s ease-out 2s both;
}

.share-title {
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.share-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.share-btn {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.share-btn:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.share-btn.whatsapp:hover {
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.3) 0%, rgba(37, 211, 102, 0.1) 100%);
  border-color: rgba(37, 211, 102, 0.5);
}

.share-btn.facebook:hover {
  background: linear-gradient(135deg, rgba(59, 89, 152, 0.3) 0%, rgba(59, 89, 152, 0.1) 100%);
  border-color: rgba(59, 89, 152, 0.5);
}

.share-btn.copy.copied {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.4) 0%, rgba(76, 175, 80, 0.2) 100%);
  border-color: rgba(76, 175, 80, 0.6);
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
  animation: fadeIn 1s ease-out 2.5s both;
}

.btn-restart,
.btn-print {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 2px solid white;
  padding: 15px 40px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  font-weight: 700;
  font-size: 1rem;
}

.btn-print {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
}

.btn-restart:hover,
.btn-print:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

.btn-print:hover {
  box-shadow: 0 15px 40px rgba(79, 172, 254, 0.6);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media print {
  .btn-back,
  .action-buttons,
  .sharing-section {
    display: none;
  }

  .celebration-title {
    font-size: 2.5rem;
  }

  .confetti {
    display: none;
  }
}

@media (max-width: 600px) {
  .birthday-container {
    padding: 20px;
  }

  .celebration-title {
    font-size: 2rem;
  }

  .cake-section {
    font-size: 5rem;
    gap: 15px;
  }

  .candle {
    font-size: 3rem;
  }

  .wishes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .love-quote {
    font-size: 1.1rem;
  }

  .share-buttons {
    gap: 10px;
  }

  .share-btn {
    padding: 10px 15px;
    font-size: 0.85rem;
  }

  .action-buttons {
    gap: 10px;
  }

  .btn-restart,
  .btn-print {
    padding: 12px 30px;
    font-size: 0.9rem;
  }
}

/* Extra small devices (320px - 480px) */
@media (max-width: 480px) {
  .birthday-container {
    padding: 15px;
    padding-top: 60px;
  }

  .btn-back {
    top: 12px;
    left: 12px;
    padding: 8px 15px;
    font-size: 0.8rem;
  }

  .celebration-title {
    font-size: 1.6rem;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }

  .cake-section {
    font-size: 3.5rem;
    margin-bottom: 25px;
    gap: 12px;
  }

  .candle {
    font-size: 2rem;
  }

  .wishes-section {
    padding: 15px;
    margin: 20px 0;
    border-radius: 18px;
  }

  .wishes-section h2 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  .wishes-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .wish-card {
    padding: 12px;
    border-radius: 12px;
  }

  .wish-emoji {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }

  .wish-card p {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .final-message {
    padding: 15px;
    margin: 20px 0;
    border-radius: 18px;
  }

  .love-quote {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .signature {
    font-size: 0.9rem;
  }

  .heart-signature {
    font-size: 0.9rem;
  }

  .sharing-section {
    margin: 20px 0;
  }

  .sharing-section h3 {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }

  .share-buttons {
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .share-btn {
    padding: 8px 12px;
    font-size: 0.8rem;
    border-radius: 12px;
  }

  .action-buttons {
    gap: 8px;
    margin-top: 20px;
  }

  .btn-restart,
  .btn-print {
    padding: 10px 20px;
    font-size: 0.85rem;
    border-radius: 20px;
  }

  .confetti {
    width: 8px;
    height: 8px;
  }
}

/* Small tablets (481px - 768px) */
@media (max-width: 768px) and (min-width: 481px) {
  .birthday-container {
    padding: 18px;
  }

  .celebration-title {
    font-size: 1.9rem;
    margin-bottom: 25px;
  }

  .cake-section {
    font-size: 4.5rem;
    gap: 15px;
  }

  .candle {
    font-size: 2.5rem;
  }

  .wishes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .wish-card {
    padding: 14px;
  }

  .wish-emoji {
    font-size: 2rem;
  }

  .wish-card p {
    font-size: 0.88rem;
  }

  .love-quote {
    font-size: 1.05rem;
  }

  .share-btn {
    padding: 9px 16px;
    font-size: 0.87rem;
  }

  .btn-restart,
  .btn-print {
    padding: 11px 28px;
    font-size: 0.92rem;
  }
}

/* Landscape orientation */
@media (max-height: 500px) and (orientation: landscape) {
  .birthday-container {
    padding: 12px;
    min-height: auto;
  }

  .btn-back {
    top: 8px;
    left: 8px;
    padding: 6px 12px;
    font-size: 0.75rem;
  }

  .celebration-title {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  .cake-section {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  .candle {
    font-size: 1.5rem;
  }

  .wishes-section {
    padding: 10px;
    margin: 10px 0;
    display: none;
  }

  .final-message {
    padding: 10px;
  }

  .love-quote {
    font-size: 0.85rem;
  }

  .sharing-section,
  .action-buttons {
    margin-top: 10px;
  }

  .share-btn,
  .btn-restart,
  .btn-print {
    padding: 6px 12px;
    font-size: 0.7rem;
  }
}
</style>
