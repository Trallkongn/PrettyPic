<template>
  <div class="carousel-container">
    <div class="carousel">
      <div class="carousel-images">
        <transition-group name="fade">
          <img v-for="(image, index) in images" :key="index" :src="image" :alt="'Image ' + (index + 1)"
            v-show="currentIndex === index" />
        </transition-group>
      </div>
    </div>
    <div class="description-container">
      <div v-for="(desc, index) in descriptions" :key="index" class="blur-background" :style="{
        backgroundImage: `url(${images[index]})`,
        display: currentIndex === index ? 'block' : 'none'
      }"></div>
      <transition name="fade">
        <p class="image-description" v-if="descriptions[currentIndex]">
          {{ descriptions[currentIndex] }}
        </p>
      </transition>
      <div class="carousel-indicators">
        <span v-for="(_, index) in images" :key="index" :class="['dot', { active: currentIndex === index }]"
          @click="goToImage(index)"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const images = ref([
  'Banner/1.jpg',
  'Banner/2.jpg',
  'Banner/3.jpg',
  'Banner/4.jpg'
])

const descriptions = ref([
  '红绿蓝黄相间，形成一个X形交叉路口。',
  '沙滩上两人相依，美景如画心悠然。',
  '完美捕捉了家庭出游时的美好时刻',
  '星光倾洒处，恋人相拥绘就浪漫轮廓 。',
])

const currentIndex = ref(0)
const intervalId = ref<number | null>(null)

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

// const prevImage = () => {
//   currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
// }

const goToImage = (index: number) => {
  currentIndex.value = index
}

onMounted(() => {
  intervalId.value = setInterval(nextImage, 3000)
})

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value)
})

</script>

<style scoped>
.carousel-container {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.carousel {
  position: relative;
  width: 800px;
  height: 320px;
  overflow: hidden;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.description-container {
  position: relative;
  height: 60px;
  width: 800px;
  overflow: hidden;
  border-radius: 0 0 22.5px 22.5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.blur-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
  opacity: 0.7;
}

.image-description {
  position: relative;
  color: white;
  padding-left: 20px;
  font-size: 20px;
  text-align: center;
  z-index: 1;
  text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.3);
}

.carousel-images img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 15px 15px 0 0;
}

.carousel-indicators {
  position: relative;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 1;
}

.dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
