<template>
  <div class="blogcontainer">
    <div class="blog-header">
      <h2>热门博客</h2>
      <div class="blog-filters">
        <button class="active">最新发布</button>
        <button>最多浏览</button>
        <button>最多评论</button>
      </div>
    </div>

    <div class="blog-grid">
      <!-- 示例帖子 -->
      <div class="blog-card" @click="clickHandler" v-for="(item, index) of cards" :key="index">
        <!-- img -->
        <div class="blog-image">
          <img :src="item.imgUrl" :alt="item.type">
        </div>
        <!-- content -->
        <div class="blog-content">
          <h3>{{ item.content }}</h3>
          <p class="blog-desc">{{ item.desc }}</p>
          <!-- meta -->
          <div class="blog-meta">
            <!-- author -->
            <div class="author">
              <img :src="item.authorUrl" alt="作者头像">
              <span>{{ item.authorName }}</span>
            </div>
            <!-- stats -->
            <div class="stats">
              <span>👁️ {{ item.looks }}</span>
              <span>💬 {{ item.comments }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';

const cards = ref([
  {
    imgUrl: "",
    type: "摄影作品",
    content: "寻找人像模特",
    desc: "正在寻找适合拍摄人像写真的模特，风格清新自然...",
    authorUrl: "",
    authorName: "摄影师小王",
    looks: "1.2k",
    comments: "32",
  },
  {
    imgUrl: "",
    type: "摄影作品",
    content: "寻找人像模特",
    desc: "正在寻找适合拍摄人像写真的模特，风格清新自然...",
    authorUrl: "",
    authorName: "摄影师小王",
    looks: "1.2k",
    comments: "32",
  },
  {
    imgUrl: "",
    type: "摄影作品",
    content: "寻找人像模特",
    desc: "正在寻找适合拍摄人像写真的模特，风格清新自然...",
    authorUrl: "",
    authorName: "摄影师小王",
    looks: "1.2k",
    comments: "32",
  },
  {
    imgUrl: "",
    type: "摄影作品",
    content: "寻找人像模特",
    desc: "正在寻找适合拍摄人像写真的模特，风格清新自然...",
    authorUrl: "",
    authorName: "摄影师小王",
    looks: "1.2k",
    comments: "32",
  },
  {
    imgUrl: "",
    type: "摄影作品",
    content: "寻找人像模特",
    desc: "正在寻找适合拍摄人像写真的模特，风格清新自然...",
    authorUrl: "",
    authorName: "摄影师小王",
    looks: "1.2k",
    comments: "32",
  },
])

const clickHandler = () => {
  router.push('/BlogPage')
}
</script>

<style scoped>
.blogcontainer {
  position: relative;
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

/* header */
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.blog-header h2 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
  position: relative;
}

.blog-header h2::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #ff69b4;
}

.blog-filters {
  display: flex;
  gap: 12px;
}

.blog-filters button {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: all 0.3s ease;
}

.blog-filters button:hover {
  background-color: #ffe4e9;
  color: #ff69b4;
  transform: translateY(-2px);
}

.blog-filters button.active {
  background-color: #ff69b4;
  color: white;
}

.blog-filters button.active:hover {
  background-color: #ff4d94;
  transform: translateY(-2px);
}

/* card */
/* 博客卡片网格布局 */
.blog-grid {
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, auto);
  gap: 10px;
  padding: 20px 0;
}

/* 博客卡片样式 */
.blog-card {
  width: 300px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: 15px;
}

.blog-content h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

.blog-desc {
  color: #666;
  font-size: 14px;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.author span {
  font-size: 14px;
  color: #666;
}

.stats {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 14px;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }

  .banner {
    width: 100%;
    height: 200px;
  }

  .dp-container .dp #dp_button {
    width: 100%;
    max-width: 400px;
  }
}
</style>
