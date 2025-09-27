<template>
  <div class="FirstStepContainer">
    <h1>第一步</h1>
    <h2>请选择服务类型</h2>
    <div class="button-group">
      <button v-for="(type, idx) in ServiceTypes" :key="idx" :style="[type.buttonPos, type.size || '']"
        @click="chooseType(type)">
        {{ type.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ServiceType } from '@/types/trade.ts'


const ServiceTypes = ref([
  {
    label: '个人写真',
    buttonPos: 'top: 30%; left: 15%; background-color: blue;',
    size: 'width: 120px; height: 120px;'
  },
  {
    label: '儿童摄影',
    buttonPos: 'top: 30%; right: 40%; background-color: red;'
  },
  {
    label: '商业摄影',
    buttonPos: 'bottom: 10px; left: 20%; background-color: green;',
    size: 'width: 120px; height: 120px;'
  },
  {
    label: '活动拍摄',
    buttonPos: 'bottom: 10px; right: 30%; background-color: orange;'
  },
  {
    label: '婚礼摄影',
    buttonPos: 'top: 55%; left: 40%; background-color: purple;',
    size: 'width: 120px; height: 120px;'
  },
  {
    label: '产品摄影',
    buttonPos: 'top: 60%; right: 10%; background-color: pink;'
  },
  {
    label: '宠物摄影',
    buttonPos: 'bottom: 27%; left: 10%; background-color: brown;'
  },
  {
    label: 'COS摄影',
    buttonPos: 'bottom: 50%; right: 10%; background-color: grey;',
    size: 'width: 120px; height: 120px;'
  },
])

const emit = defineEmits<{
  (e: 'type-selected', type: ServiceType): void
}>()

const chooseType = (type: ServiceType) => {
  console.log('选择服务类型：', type.label)
  emit('type-selected', type)
}
</script>

<style scoped>
.FirstStepContainer {
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.button-group button {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.5);
  animation: bubble 0.8s ease-out forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button-group button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

/* 添加动画关键帧 */
@keyframes bubble {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
