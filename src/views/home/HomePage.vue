<template>
  <!-- 顶部导航栏 -->
  <HeaderComponent />

  <!-- 图片轮播Banner -->
  <section class="banner">
    <CarouselBanner />
  </section>

  <!-- 业务展示区 -->
  <section class="services">
    <div class="service-card" @click="onQuickShot">
      <img src="https://img.icons8.com/ios-filled/100/camera.png" alt="一键约拍" />
      <h3>一键约拍</h3>
      <p>快速预约专业摄影师，轻松拍出满意照片。</p>
      <!-- 扩展接口：插槽或props -->
    </div>
    <div class="service-card" @click="onCustomize">
      <img src="https://img.icons8.com/ios-filled/100/settings.png" alt="客制化" />
      <h3>客制化</h3>
      <p>根据您的需求定制专属拍摄方案。</p>
      <!-- 扩展接口：插槽或props -->
    </div>
  </section>

  <!-- 博客展示Grid -->
  <section class="blogs">
    <h2>摄影知识与案例</h2>
    <div class="blog-grid">
      <div class="blog-card" v-for="(blog, idx) in blogs" :key="idx">
        <img :src="blog.img" :alt="blog.title" />
        <h4>{{ blog.title }}</h4>
        <p>{{ blog.summary }}</p>
        <!-- 扩展接口：插槽或props -->
      </div>
    </div>
  </section>

  <!-- 底部市场监管认证区域 -->
  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import CarouselBanner from '@/components/CarouselBanner.vue'

const blogs = ref([
  { title: '如何拍出好看的证件照', summary: '掌握光线与表情，轻松拍出满意证件照。', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
  { title: '客制化摄影服务介绍', summary: '满足不同场景需求，定制专属拍摄方案。', img: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80' },
  { title: '拍摄小技巧', summary: '简单几步，提升照片质感。', img: 'Banner/2.jpg' },
  { title: '摄影师专访', summary: '走进专业摄影师的世界。', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' }
])

// 业务区点击事件（可扩展）
const onQuickShot = () => {
  // TODO: 跳转或弹窗
  window.open('/Trade', '_blank');
}
const onCustomize = () => {
  // TODO: 跳转或弹窗
  window.open('/Trade', '_blank');
}
</script>

<style scoped>
.banner {
  width: 100%;
  background-color: #222;
}

.services {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2.5rem 0 2rem 0;
}

.service-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem 2.5rem;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  width: 260px;
}

.service-card:hover {
  box-shadow: 0 6px 24px rgba(255, 152, 0, 0.18);
  transform: translateY(-4px) scale(1.03);
}

.service-card img {
  width: 60px;
  margin-bottom: 1rem;
}

.service-card h3 {
  margin: 0.5rem 0 0.7rem 0;
  color: #ff9800;
}

.blogs {
  background: #fafafa;
  padding: 2rem 0 2.5rem 0;
}

.blogs h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #222;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.blog-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  padding: 1.2rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.blog-card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.7rem;
}

.blog-card h4 {
  margin: 0.3rem 0 0.5rem 0;
  color: #ff9800;
}
</style>
