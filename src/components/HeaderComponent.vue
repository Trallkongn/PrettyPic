<template>
  <header class="navbar">
    <div class="navbar-left">
      <span class="welcome">欢迎来到PrettyPic拍照门户</span>
      <nav>
        <router-link to="/HomePage">首页</router-link>
        <router-link to="/Community">社区</router-link>
        <router-link to="/Product">产品</router-link>
        <router-link to="/Help">帮助</router-link>
      </nav>
    </div>
    <div class="navbar-right">
      <!-- 登录前 -->
      <template v-if="!isLogin">
        <button class="login-btn" @click="showLogin = true">登录</button>
        <button class="register-btn" @click="showRegister = true">注册</button>
      </template>
      <!-- 登录后 -->
      <template v-else>
        <div class="user-info-bar">
          <BellButton />
          <RouterLink to="/User" style="display: flex; align-items: center; gap: 0.5rem;">
            <img class="user-avatar" :src="user.avatar" alt="用户头像" />
            <span class="user-nickname">{{ user.nickname }}</span>
          </RouterLink>
        </div>
      </template>
    </div>
  </header>
  <Teleport to="body">
    <div v-if="showLogin" class="login-modal" @click.self="closeLogin">
      <div class="login-modal-content" ref="modalContent">
        <LoginWindow ref="loginWindow" />
        <button class="close-btn" @click="closeLogin">&times;</button>
      </div>
    </div>
    <div v-if="showRegister" class="login-modal" @click.self="closeRegister">
      <div class="login-modal-content" ref="registerModalContent">
        <RegisterWindow ref="registerWindow" />
        <button class="close-btn" @click="closeRegister">&times;</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import LoginWindow from './LoginWindow.vue';
import RegisterWindow from './RegisterWindow.vue';
import BellButton from './BellButton.vue';

const showLogin = ref(false)
const showRegister = ref(false)
const loginWindow = ref()
const registerWindow = ref()
const modalContent = ref()
const registerModalContent = ref()
const isLogin = ref(true)
// 模拟登录后用户信息
const user = ref({
  avatar: 'https://img.icons8.com/ios-filled/100/camera.png',
  nickname: '摄影小白'
})

const closeLogin = () => {
  showLogin.value = false
}
const closeRegister = () => {
  showRegister.value = false
}

// 聚焦到LoginWindow第一个输入框
watch(showLogin, async (val) => {
  if (val) {
    await nextTick()
    // 尝试聚焦LoginWindow中的第一个input
    const modal = modalContent.value as HTMLElement
    if (modal) {
      const input = modal.querySelector('input')
      if (input) input.focus()
    }
  }
})

// 聚焦到RegisterWindow第一个输入框
watch(showRegister, async (val) => {
  if (val) {
    await nextTick()
    // 尝试聚焦RegisterWindow中的第一个input
    const modal = registerModalContent.value as HTMLElement
    if (modal) {
      const input = modal.querySelector('input')
      if (input) input.focus()
    }
  }
})
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  color: #fff;
  padding: 0.5rem 2rem;
  font-size: 16px;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.welcome {
  margin-right: 2rem;
  font-weight: bold;
  font-size: 18px;
}

.navbar-left nav a {
  color: #fff;
  margin-right: 1.5rem;
  text-decoration: none;
  transition: color 0.2s;
}

.navbar-left nav a:hover {
  color: #ff9800;
}

/* 添加激活状态的样式 */
.navbar-left nav a.router-link-exact-active {
  color: #ff9800;
  font-weight: bold;
}

.navbar-right button {
  margin-left: 1rem;
  background: #ff9800;
  color: #fff;
  border: none;
  padding: 0.4rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.navbar-right button:hover {
  background: #ffa726;
}

.login-modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-modal-content {
  position: relative;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border: none;
  font-size: 22px;
  color: #888;
  cursor: pointer;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  line-height: 28px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;
}

.close-btn:hover {
  background: #eee;
}

.user-info-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ff9800;
  background: #fafafa;
}

.user-nickname {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  margin-left: 0.2rem;
}
</style>
