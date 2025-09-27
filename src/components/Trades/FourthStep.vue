<template>
  <div class="forth-step-container">
    <h1>第四步</h1>
    <h2>订单确认</h2>
    <div class="order-summary">
      <h3>订单详情</h3>
      <p>服务类型: {{ tradeData.serviceType?.label }}</p>
      <p>
        套餐信息: {{ tradeData.meal ? tradeData.meal.name : '无' }}
        {{ tradeData.meal ? tradeData.meal.description : '' }}
        {{ tradeData.meal ? tradeData.meal.features.join(', ') : '' }}
      </p>
      <p>地址: {{ tradeData.address ? `${tradeData.address.location}, ${tradeData.address.details}` : '无' }}</p>
      <p>总价: {{ tradeData.meal ? tradeData.meal.price : '0' }} 元</p>
      <button class="confirm-button" @click="confirmOrder">确认订单</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TradeData } from '@/types/trade.ts'

const props = defineProps<{
  tradeData: TradeData
}>()

// 定义emit事件
const emit = defineEmits<{
  (e: 'order-confirmed'): void
}>()

// 确认订单方法
const confirmOrder = () => {
  console.log('订单已确认:', props.tradeData)
  emit('order-confirmed')
}
</script>

<style scoped>
.forth-step-container {
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.order-summary {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem;
  text-align: center;
  width: 80%;
  max-width: 500px;
  margin-top: 2rem;
}

.order-summary h3 {
  margin: 0 0 1.5rem 0;
  color: #ff9800;
  font-size: 1.3rem;
}

.order-summary p {
  margin: 1rem 0;
  color: #222;
  font-size: 1rem;
  text-align: left;
}

.confirm-button {
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 1.5rem;
}

.confirm-button:hover {
  background-color: #f57c00;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
