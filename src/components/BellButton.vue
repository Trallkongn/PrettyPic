<template>
  <button class="bell-button" @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    aria-label="通知中心" aria-live="polite">
    <Transition name="fade" mode="out-in">
      <span v-if="!isHovered" key="text">消息</span>
      <svg v-else key="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" />
      </svg>
    </Transition>

    <!-- 未读标记 -->
    <!-- <span v-if="unreadCount > 0" class="notification-badge">
      {{ unreadCount > 99 ? "99+" : unreadCount }}
    </span> -->
  </button>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

// interface Props {
//   unreadCount?: number;
// }

// const props = withDefaults(defineProps<Props>(), {
//   unreadCount: 0,
// });

const emit = defineEmits<{
  (e: "click"): void;
}>();

const isHovered = ref(false);

const handleMouseEnter = () => (isHovered.value = true);
const handleMouseLeave = () => (isHovered.value = false);
const handleClick = () => {
  emit("click");
  // 这里可以添加点击后的逻辑，比如播放音效
};

// 响应式监听窗口变化（移动端可能需要）
onMounted(() => {
  window.addEventListener("resize", handleMouseLeave);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleMouseLeave);
});
</script>

<style scoped>
.bell-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 35px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--text-color, #333);
  font-size: 15px;
  writing-mode: vertical-lr;
  transition: all 0.3s ease;
}


.bell-button:hover {
  color: var(--hover-color, #ff4d4f);
}

.notification-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background-color: #ff4d4f;
  color: white;
  font-size: 12px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  transition: transform 0.2s ease;
}

.bell-button:active .notification-badge {
  transform: scale(0.9);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
