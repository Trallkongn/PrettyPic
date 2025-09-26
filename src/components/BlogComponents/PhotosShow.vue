<template>
  <div class="photos-show">
    <!-- 大图展示区 -->
    <div class="main-photo" @click="openFullScreen(currentPhoto)">
      <img :src="currentPhoto.url" :alt="currentPhoto.title" />
      <div class="photo-description">
        {{ currentPhoto.description }}
      </div>
    </div>

    <!-- 缩略图展示区 -->
    <div class="thumbnails">
      <div v-for="(photo, index) in photos" :key="index" class="thumbnail"
        :class="{ active: photo.id === currentPhoto.id }" @click="selectPhoto(photo)">
        <img :src="photo.url" :alt="photo.title" />
      </div>
    </div>

    <!-- 全屏展示按钮 -->
    <div class="fullscreen-button">
      <button @click="openFullScreen(currentPhoto)">查看所有图片</button>
    </div>

    <!-- 全屏展示overlay -->
    <div v-if="showFullScreen" class="fullscreen-overlay" @click="closeFullScreen">
      <div class="fullscreen-content" @click.stop>
        <button class="close-button" @click="closeFullScreen">×</button>
        <button class="nav-button prev" @click="prevPhoto">‹</button>
        <img :src="currentFullScreenPhoto.url" :alt="currentFullScreenPhoto.title" />
        <div class="fullscreen-description">{{ currentFullScreenPhoto.description }}</div>
        <button class="nav-button next" @click="nextPhoto">›</button>
        <div class="photo-counter">{{ currentFullScreenIndex + 1 }} / {{ photos.length }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Photo {
  id: number
  url: string
  title: string
  description: string
}

const photos = ref<Photo[]>([
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
    title: '山水风景',
    description: '壮丽的山脉与清澈的湖水相映成趣'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    title: '自然风光',
    description: '云雾缭绕的山峰如仙境一般'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    title: '自然景观',
    description: '色彩斑斓的自然景观令人叹为观止'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1200&q=80',
    title: '森林小径',
    description: '阳光透过树叶洒在幽静的小径上'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80',
    title: '瀑布溪流',
    description: '清澈的溪水从瀑布上飞流直下'
  }
])

const currentPhoto = ref<Photo>(photos.value[0])
const showFullScreen = ref(false)
const currentFullScreenPhoto = ref<Photo>(photos.value[0])
const currentFullScreenIndex = computed(() =>
  photos.value.findIndex(photo => photo.id === currentFullScreenPhoto.value.id)
)

const selectPhoto = (photo: Photo) => {
  currentPhoto.value = photo
}

const openFullScreen = (photo: Photo) => {
  currentFullScreenPhoto.value = photo
  showFullScreen.value = true
  document.body.style.overflow = 'hidden'
}

const closeFullScreen = () => {
  showFullScreen.value = false
  document.body.style.overflow = 'auto'
}

const nextPhoto = () => {
  const nextIndex = (currentFullScreenIndex.value + 1) % photos.value.length
  currentFullScreenPhoto.value = photos.value[nextIndex]
}

const prevPhoto = () => {
  const prevIndex = (currentFullScreenIndex.value - 1 + photos.value.length) % photos.value.length
  currentFullScreenPhoto.value = photos.value[prevIndex]
}
</script>

<style scoped>
.photos-show {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.main-photo {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  margin-bottom: 1.5rem;
  height: 500px;
}

.main-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-description {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 1rem;
  font-size: 1.1rem;
}

.thumbnails {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.thumbnail {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnail.active {
  border-color: #ff9800;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fullscreen-button {
  text-align: center;
  margin-bottom: 2rem;
}

.fullscreen-button button {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 2rem;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.fullscreen-button button:hover {
  background: #ffa726;
}

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fullscreen-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.fullscreen-content img {
  max-width: 80vw;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
}

.close-button {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.nav-button.prev {
  left: -60px;
}

.nav-button.next {
  right: -60px;
}

.fullscreen-description {
  color: white;
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
}

.photo-counter {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .main-photo {
    height: 300px;
  }

  .thumbnail {
    width: 80px;
    height: 80px;
  }

  .nav-button.prev {
    left: 10px;
  }

  .nav-button.next {
    right: 10px;
  }

  .fullscreen-content img {
    max-width: 95vw;
    max-height: 60vh;
  }
}
</style>
