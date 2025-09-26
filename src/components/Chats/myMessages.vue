<template>
  <div class="chat-container">
    <!-- 左侧联系人列表 -->
    <div class="contacts-panel">
      <div class="contact-list">
        <div class="contact-item service-contact active">
          <img src="https://img.icons8.com/color/96/service.png" alt="客服" />
          <span>客服</span>
        </div>
        <div 
          v-for="contact in contacts" 
          :key="contact.id" 
          class="contact-item"
          @click="selectContact(contact)"
        >
          <img :src="contact.avatar" :alt="contact.name" />
          <span>{{ contact.name }}</span>
        </div>
      </div>
    </div>

    <!-- 右侧聊天区域 -->
    <div class="chat-panel">
      <!-- 聊天顶部 -->
      <div class="chat-header">
        <h3>{{ currentContact.name }}</h3>
      </div>

      <!-- 消息展示区域 -->
      <div class="messages-container" ref="messagesContainer">
        <div 
          v-for="message in messages" 
          :key="message.id" 
          :class="['message', message.sender === 'me' ? 'sent' : 'received']"
        >
          <div class="message-content">
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ message.time }}</div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="input-container" v-if="showInput">
        <div class="input-tools">
          <button class="tool-button" @click="triggerFileInput">
            <img src="https://img.icons8.com/ios-filled/50/image.png" alt="上传图片" />
          </button>
          <button class="tool-button" @click="toggleEmojiPicker">
            <img src="https://img.icons8.com/ios-filled/50/grinning.png" alt="表情" />
          </button>
        </div>
        <div class="input-area">
          <textarea 
            v-model="newMessage" 
            placeholder="输入消息..." 
            @keydown.enter="sendMessage"
          ></textarea>
        </div>
        <div class="send-button">
          <button @click="sendMessage">
            <img src="https://img.icons8.com/ios-filled/50/sent.png" alt="发送" />
          </button>
        </div>
      </div>

      <!-- 表情选择器 -->
      <div v-if="showEmojiPicker" class="emoji-picker">
        <div 
          v-for="emoji in emojis" 
          :key="emoji" 
          class="emoji-item" 
          @click="addEmoji(emoji)"
        >
          {{ emoji }}
        </div>
      </div>
    </div>

    <!-- 隐藏输入框按钮 -->
    <div class="toggle-input" @click="toggleInput">
      <img 
        :src="showInput ? 'https://img.icons8.com/ios-filled/50/collapse-arrow.png' : 'https://img.icons8.com/ios-filled/50/expand-arrow.png'" 
        :alt="showInput ? '收起' : '展开'" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

// 联系人数据
const contacts = ref([
  { id: 1, name: '张三', avatar: 'https://img.icons8.com/color/96/user.png' },
  { id: 2, name: '李四', avatar: 'https://img.icons8.com/color/96/user-female.png' },
  { id: 3, name: '王五', avatar: 'https://img.icons8.com/color/96/user-male.png' }
])

// 当前选中联系人
const currentContact = ref({ id: 0, name: '客服', avatar: 'https://img.icons8.com/color/96/service.png' })

// 消息数据
const messages = ref([
  { id: 1, text: '您好，有什么可以帮助您的吗？', sender: 'them', time: '10:00' },
  { id: 2, text: '我想了解一下你们的摄影服务', sender: 'me', time: '10:02' },
  { id: 3, text: '我们提供多种摄影服务，包括证件照、婚纱照、写真等', sender: 'them', time: '10:03' }
])

// 输入相关状态
const newMessage = ref('')
const showInput = ref(true)
const showEmojiPicker = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

// 表情数据
const emojis = ref(['😀', '😂', '😍', '😎', '👍', '👏', '❤️', '🎉', '🔥', '✨'])

// 选择联系人
const selectContact = (contact: { id: number; name: string; avatar: string }) => {
  currentContact.value = contact
  // 这里可以加载与该联系人的历史消息
}

// 发送消息
const sendMessage = (e: KeyboardEvent | MouseEvent) => {
  if (e instanceof KeyboardEvent && e.shiftKey) return // 允许shift+enter换行
  
  if (newMessage.value.trim() === '') return
  
  const now = new Date()
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  
  messages.value.push({
    id: messages.value.length + 1,
    text: newMessage.value,
    sender: 'me',
    time: timeString
  })
  
  newMessage.value = ''
  showEmojiPicker.value = false
  
  // 滚动到底部
  scrollToBottom()
  
  // 模拟回复
  setTimeout(() => {
    messages.value.push({
      id: messages.value.length + 1,
      text: '收到，我们会尽快处理您的问题',
      sender: 'them',
      time: `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`
    })
    scrollToBottom()
  }, 1000)
}

// 切换输入框显示
const toggleInput = () => {
  showInput.value = !showInput.value
}

// 切换表情选择器
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

// 添加表情
const addEmoji = (emoji: string) => {
  newMessage.value += emoji
  showEmojiPicker.value = false
}

// 触发文件上传
const triggerFileInput = () => {
  // 实际项目中这里会触发文件选择
  alert('点击了上传图片按钮')
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-container {
  display: flex;
  width: 100%;
  height: 600px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  position: relative;
}

.contacts-panel {
  width: 250px;
  background: #f5f5f5;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.contact-list {
  flex: 1;
  overflow-y: auto;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.contact-item:hover {
  background: #e0e0e0;
}

.contact-item.active {
  background: #ff9800;
  color: white;
}

.contact-item img {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}

.chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chat-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  background: #fafafa;
}

.chat-header h3 {
  margin: 0;
  color: #222;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  margin-bottom: 15px;
  max-width: 70%;
}

.message.sent {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message.received {
  align-self: flex-start;
}

.message-content {
  display: flex;
  flex-direction: column;
}

.message.sent .message-content {
  align-items: flex-end;
}

.message.received .message-content {
  align-items: flex-start;
}

.message-text {
  padding: 10px 15px;
  border-radius: 18px;
  word-wrap: break-word;
  max-width: 100%;
}

.message.sent .message-text {
  background: #ff9800;
  color: white;
  border-bottom-right-radius: 4px;
}

.message.received .message-text {
  background: #f1f1f1;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.input-container {
  display: flex;
  padding: 15px;
  border-top: 1px solid #eee;
  background: #fafafa;
}

.input-tools {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.tool-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-right: 5px;
}

.tool-button img {
  width: 24px;
  height: 24px;
}

.input-area {
  flex: 1;
}

.input-area textarea {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 15px;
  resize: none;
  height: 40px;
  box-sizing: border-box;
  font-family: inherit;
}

.send-button {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.send-button button {
  background: #ff9800;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-button button img {
  width: 20px;
  height: 20px;
}

.emoji-picker {
  position: absolute;
  bottom: 80px;
  left: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 250px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.emoji-item {
  padding: 5px;
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.2s;
}

.emoji-item:hover {
  transform: scale(1.2);
}

.toggle-input {
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: #ff9800;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.toggle-input img {
  width: 15px;
  height: 15px;
}
</style>