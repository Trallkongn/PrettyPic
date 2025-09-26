<template>
  <HeaderComponent />

  <div class="admin-container">
    <div class="admin-content">
      <!-- 订单管理部分 -->
      <section class="admin-section">
        <h2>订单管理</h2>
        <div class="search-bar">
          <input v-model="orderSearch" placeholder="搜索订单..." class="search-input" />
          <button class="search-button">搜索</button>
        </div>
        <div class="orders-table">
          <table>
            <thead>
              <tr>
                <th>订单号</th>
                <th>用户</th>
                <th>服务类型</th>
                <th>预约时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.user }}</td>
                <td>{{ order.service }}</td>
                <td>{{ order.time }}</td>
                <td>
                  <span :class="['status', order.status.toLowerCase()]">
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <button class="action-button">处理</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 博客管理部分 -->
      <section class="admin-section">
        <h2>博客管理</h2>
        <div class="blogs-management">
          <div class="blog-actions">
            <button class="add-blog-button">添加新博客</button>
          </div>
          <div class="blog-cards">
            <div class="blog-card" v-for="blog in blogs" :key="blog.id">
              <img :src="blog.img" :alt="blog.title" />
              <div class="blog-info">
                <h3>{{ blog.title }}</h3>
                <p>{{ blog.summary }}</p>
                <div class="blog-actions">
                  <button class="edit-button">编辑</button>
                  <button class="delete-button">删除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 用户聊天部分 -->
      <section class="admin-section">
        <h2>用户聊天</h2>
        <DialogComponent />
      </section>
    </div>
  </div>

  <FooterComponent />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import DialogComponent from '@/components/Chats/DialogComponent.vue';

// 订单搜索
const orderSearch = ref('');

// 订单数据
const orders = ref([
  { id: 'ORD001', user: '张三', service: '证件照', time: '2023-06-15 10:00', status: '待处理' },
  { id: 'ORD002', user: '李四', service: '婚纱照', time: '2023-06-16 14:00', status: '已确认' },
  { id: 'ORD003', user: '王五', service: '写真', time: '2023-06-17 09:30', status: '已完成' },
  { id: 'ORD004', user: '赵六', service: '证件照', time: '2023-06-18 11:00', status: '待处理' }
]);

// 过滤订单
const filteredOrders = computed(() => {
  if (!orderSearch.value) return orders.value;
  const search = orderSearch.value.toLowerCase();
  return orders.value.filter(order =>
    order.id.toLowerCase().includes(search) ||
    order.user.toLowerCase().includes(search) ||
    order.service.toLowerCase().includes(search)
  );
});

// 博客数据
const blogs = ref([
  {
    id: 1,
    title: '如何拍出好看的证件照',
    summary: '掌握光线与表情，轻松拍出满意证件照。',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: '客制化摄影服务介绍',
    summary: '满足不同场景需求，定制专属拍摄方案。',
    img: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: '拍摄小技巧',
    summary: '简单几步，提升照片质感。',
    img: 'Banner/1.jpg'
  }
]);
</script>

<style scoped>
.admin-container {
  padding: 2rem 0;
  background-color: #fafafa;
  min-height: calc(100vh - 120px);
}

.admin-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.admin-section {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem;
  margin-bottom: 2rem;
}

.admin-section h2 {
  color: #ff9800;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.search-bar {
  display: flex;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.search-button,
.add-blog-button,
.action-button,
.edit-button,
.delete-button {
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.search-button:hover,
.add-blog-button:hover,
.action-button:hover,
.edit-button:hover,
.delete-button:hover {
  background: #e68900;
}

.orders-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.status.待处理 {
  background-color: #fff3cd;
  color: #856404;
}

.status.已确认 {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status.已完成 {
  background-color: #d4edda;
  color: #155724;
}

.blogs-management {
  width: 100%;
}

.blog-actions {
  margin-bottom: 1.5rem;
}

.blog-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.blog-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}

.blog-card:hover {
  box-shadow: 0 6px 24px rgba(255, 152, 0, 0.18);
  transform: translateY(-4px) scale(1.03);
}

.blog-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.blog-info {
  padding: 1.2rem;
}

.blog-info h3 {
  margin: 0 0 0.5rem 0;
  color: #ff9800;
}

.blog-info p {
  margin: 0 0 1rem 0;
  color: #666;
}

.blog-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-button {
  background: #17a2b8;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.delete-button {
  background: #dc3545;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* 覆盖DialogComponent的样式以适应管理页面 */
:deep(.chat-container) {
  box-shadow: none;
  border-radius: 0;
}
</style>
