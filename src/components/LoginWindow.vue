<template>
  <div class="login-window">
    <!-- Logo区域 -->
    <div class="logo-area">
      <img class="logo-img" src="https://img.icons8.com/ios-filled/100/camera.png" alt="PrettyPic Logo" />
      <span class="logo-title">PrettyPic 门户登录</span>
    </div>

    <!-- 登录表单 -->
    <form class="login-form" @submit.prevent="onLogin">
      <div class="input-group">
        <select v-model="loginType" class="login-type">
          <option value="phone">手机号</option>
          <option value="email">邮箱</option>
        </select>
        <input v-if="loginType === 'phone'" v-model="form.phone" type="text" placeholder="请输入手机号" maxlength="20" />
        <input v-else v-model="form.email" type="email" placeholder="请输入邮箱" maxlength="40" />
      </div>

      <div class="input-group switch-group">
        <button type="button" class="switch-btn" @click="useCode = !useCode">
          {{ useCode ? '使用密码登录' : '使用验证码登录' }}
        </button>
      </div>

      <div class="input-group">
        <input v-if="!useCode" v-model="form.password" type="password" placeholder="请输入密码" maxlength="32" />
        <div v-else class="code-group">
          <input v-model="form.code" type="text" placeholder="请输入验证码" maxlength="8" />
          <button type="button" class="send-code-btn" @click="onSendCode" :disabled="codeSent">
            {{ codeSent ? `${countdown}s后重试` : '发送验证码' }}
          </button>
        </div>
      </div>

      <button class="login-btn" type="submit">登录</button>
      <!-- 扩展接口：插槽或props -->
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loginType = ref<'phone' | 'email'>('phone')
const useCode = ref(false)
const codeSent = ref(false)
const countdown = ref(60)
let timer: number | null = null

const form = ref({
  phone: '',
  email: '',
  password: '',
  code: ''
})

const onSendCode = () => {
  if (codeSent.value) return
  codeSent.value = true
  countdown.value = 60
  timer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      codeSent.value = false
      if (timer) clearInterval(timer)
    }
  }, 1000)
  // TODO: 发送验证码逻辑
}

const onLogin = () => {
  // TODO: 登录逻辑
}
</script>

<style scoped>
.login-window {
  width: 360px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.logo-img {
  width: 60px;
  margin-bottom: 0.5rem;
}

.logo-title {
  font-size: 20px;
  font-weight: bold;
  color: #ff9800;
  letter-spacing: 2px;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.login-type {
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fafafa;
  font-size: 15px;
}

.input-group input[type="text"],
.input-group input[type="email"],
.input-group input[type="password"] {
  flex: 1;
  padding: 0.5rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 15px;
}

.switch-group {
  justify-content: flex-end;
}

.switch-btn {
  background: none;
  border: none;
  color: #ff9800;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
}

.switch-btn:hover {
  text-decoration: underline;
}

.code-group {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
}

.send-code-btn {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1rem;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.send-code-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.login-btn {
  margin-top: 0.5rem;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.7rem 0;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #ffa726;
}
</style>
