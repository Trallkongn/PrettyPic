<template>
  <div class="container">
    <div class="chat-content">
      <div class="left">
        <h3>消息中心</h3>
        <ul class="nav-menu">
          <li v-for="(item, index) in menuItems" @click="selectMenu(index)" :key="index">
            <a :class="{ active: item.isActive }" href="javascript:void(0);">
              <i :class="item.icon"></i>
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>

      <div class="right">
        <component :is=currentComponent></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, markRaw, ref } from 'vue'
import Dialog from './Chats/DialogComponent.vue'

const componentsMap = {
  Dialog: markRaw(Dialog),
}

const menuItems = ref([
  { text: '我的消息', component: 'Dialog', icon: 'iconfont icon-message;', isActive: true },
  { text: '回复我的', icon: 'iconfont icon-reply', isActive: false },
  { text: '@我的', icon: 'iconfont icon-at', isActive: false },
  { text: '收到的赞', icon: 'iconfont icon-like', isActive: false },
  { text: '系统通知', icon: 'iconfont icon-notice', isActive: false }
]);

const currentComponent = computed(() => {
  const activeItem = menuItems.value.find(item => item.isActive);
  if (!activeItem) return componentsMap.Dialog;
  return componentsMap[activeItem.component as keyof typeof componentsMap] || 'div';
})

const selectMenu = (index: number) => {
  menuItems.value.forEach((item, i) => {
    item.isActive = i === index;
  });
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f6f7f8;
}

.chat-content {
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.left {
  width: 240px;
  background-color: #ffffff;
  border-right: 1px solid #eee;
}

.left h3 {
  padding: 20px;
  margin: 0;
  font-size: 18px;
  color: #18191c;
  border-bottom: 1px solid #eee;
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  padding: 0;
}

.nav-menu a {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  color: #5c6066;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-menu a:hover {
  color: #00a1d6;
  background-color: #f6f7f8;
}

.nav-menu a.active {
  color: #00a1d6;
  background-color: #e3f2fd;
  font-weight: 500;
}

.nav-menu i {
  margin-right: 12px;
  font-size: 18px;
}

.right {
  flex: 1;
  padding: 20px;
  min-width: 0;
}
</style>
