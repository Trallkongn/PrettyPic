<template>
  <!-- Header -->
  <HeaderComponent />

  <main class="user-main">
    <!-- 个人信息区域 -->
    <section class="user-info">
      <h2>个人信息</h2>
      <div class="avatar-area">
        <img class="avatar-img" :src="user.avatar" alt="用户头像" />
        <input type="file" accept="image/*" class="avatar-upload" @change="onAvatarChange" />
        <button class="avatar-btn" @click="triggerAvatarUpload">更换头像</button>
      </div>
      <div class="info-fields">
        <div class="info-item">
          <label>昵称：</label>
          <input v-model="user.nickname" />
        </div>
        <div class="info-item">
          <label>手机号：</label>
          <input v-model="user.phone" />
        </div>
        <div class="info-item">
          <label>邮箱：</label>
          <input v-model="user.email" />
        </div>
        <div class="info-item">
          <label>实名认证：</label>
          <span>{{ user.verified ? '已认证' : '未认证' }}</span>
          <button style="margin-left: 5px;" v-if="!user.verified" @click="onVerify">去认证</button>
        </div>
        <!-- 添加管理员入口 -->
        <div v-if="user.isAdmin" class="info-item">
          <label>管理员入口：</label>
          <button @click="goToAdminPage">进入管理页面</button>
        </div>
      </div>
      <button class="save-btn" @click="onSave">保存修改</button>
      <!-- 扩展接口：插槽或props -->
    </section>

    <!-- 订单展示区 -->
    <section class="user-orders">
      <h2>我的订单</h2>
      <div v-if="orders.length === 0" class="empty">暂无订单</div>
      <div v-else class="order-list">
        <div class="order-card" v-for="order in orders" :key="order.id">
          <div>
            <strong>订单号：</strong>{{ order.id }}
          </div>
          <div>
            <strong>服务：</strong>{{ order.service }}
          </div>
          <div>
            <strong>状态：</strong>{{ order.status }}
          </div>
          <div>
            <strong>下单时间：</strong>{{ order.date }}
          </div>
          <!-- 扩展接口：插槽或props -->
        </div>
      </div>
    </section>

    <!-- 用户博客展示Grid -->
    <section class="user-blogs">
      <h2>我的博客</h2>
      <div v-if="blogs.length === 0" class="empty">暂无博客</div>
      <div v-else class="blog-grid">
        <div class="blog-card" v-for="(blog, idx) in blogs" :key="idx">
          <img :src="blog.img" :alt="blog.title" />
          <h4>{{ blog.title }}</h4>
          <p>{{ blog.summary }}</p>
          <!-- 扩展接口：插槽或props -->
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <FooterComponent />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

const router = useRouter()

const user = ref({
  avatar: 'https://img.icons8.com/ios-filled/100/camera.png',
  nickname: '摄影小白',
  phone: '138****8888',
  email: 'user@example.com',
  verified: false,
  // 添加管理员标识
  isAdmin: true
})

const onSave = () => {
  // TODO: 保存用户信息
}

const onVerify = () => {
  // TODO: 跳转实名认证
}

const onAvatarChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      user.value.avatar = ev.target?.result as string
    }
    reader.readAsDataURL(files[0])
  }
}
const triggerAvatarUpload = () => {
  const input = document.querySelector('.avatar-upload') as HTMLInputElement
  if (input) input.click()
}

const goToAdminPage = () => {
  router.push('/admin')
}

const orders = ref([
  { id: '20240601001', service: '一键约拍', status: '已完成', date: '2024-06-01' },
  { id: '20240602002', service: '客制化', status: '进行中', date: '2024-06-02' }
  // ...可扩展
])

const blogs = ref([
  { title: '我的拍摄体验', summary: '分享一次愉快的拍摄经历。', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
  { title: '摄影小技巧', summary: '简单几步，提升照片质感。', img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80' }
  // ...可扩展
])
</script>

<style scoped>
.user-main {
  max-width: 1100px;
  margin: 2rem auto 0 auto;
  padding: 0 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.user-info {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem 2.5rem;
}

.user-info h2 {
  margin-bottom: 1.2rem;
  color: #ff9800;
}

.avatar-area {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1.5rem;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ff9800;
  background: #fafafa;
}

.avatar-upload {
  display: none;
}

.avatar-btn {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1.2rem;
  font-size: 15px;
  cursor: pointer;
  margin-left: 0.5rem;
}

.avatar-btn:hover {
  background: #ffa726;
}

.info-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 2.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  min-width: 260px;
  margin-bottom: 0.7rem;
  font-size: 15px;
}

.info-item label {
  width: 90px;
  color: #333;
  font-weight: bold;
}

.info-item input {
  flex: 1;
  padding: 0.4rem 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 1rem;
  font-size: 15px;
}

.info-item button {
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 0.3rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.save-btn {
  margin-top: 1.2rem;
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.save-btn:hover,
.info-item button:hover {
  background: #ffa726;
}

.user-orders {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem 2.5rem;
}

.user-orders h2 {
  margin-bottom: 1.2rem;
  color: #ff9800;
}

.order-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.order-card {
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 1rem 1.5rem;
  min-width: 220px;
  flex: 1 1 260px;
  margin-bottom: 0.5rem;
}

.empty {
  color: #bbb;
  font-size: 15px;
  padding: 1rem 0;
}

.user-blogs {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem 2.5rem;
}

.user-blogs h2 {
  margin-bottom: 1.2rem;
  color: #ff9800;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.blog-card {
  background: #fafafa;
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
