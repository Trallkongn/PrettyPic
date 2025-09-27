<template>
  <main class="trade-main">
    <div class="trade-steps">
      <component v-if="componentsMap[currentStep]" :is="componentsMap[currentStep]" :tradeData="tradeData"
        @type-selected="handleTypeSelected" @meal-selected="handleMealSelected" @custom-selected="handleCustomSelected"
        @custom-finished="handleCustomFinished" @address-filled="handleAddressFilled"
        @order-confirmed="handleOrderConfirmed" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { markRaw, ref, type Component } from 'vue'
import FirstStep from '@/components/Trades/FirstStep.vue';
import SecondStep from '@/components/Trades/SecondStep.vue';
import CustomizeMeals from '@/components/Trades/CustomizeMeals.vue';
import ThirdStep from '@/components/Trades/ThirdStep.vue';
import FourthStep from '@/components/Trades/FourthStep.vue';
import type { ServiceType, Meal, TradeData } from '@/types/trade.ts'

interface ComponentsMap {
  [key: string]: Component;
  FirstStep: Component;
  SecondStep: Component;
  CustomizeMeals: Component;
  ThirdStep: Component;
  FourthStep: Component;
}

const tradeData = ref<TradeData>({
  serviceType: null,
  meal: null,
  address: null
})

const componentsMap = ref<ComponentsMap>({
  FirstStep: markRaw(FirstStep),
  SecondStep: markRaw(SecondStep),
  CustomizeMeals: markRaw(CustomizeMeals),
  ThirdStep: markRaw(ThirdStep),
  FourthStep: markRaw(FourthStep)
})

const currentStep = ref('FirstStep')

// step1 选择服务类型
const handleTypeSelected = (type: ServiceType) => {
  currentStep.value = 'SecondStep'
  tradeData.value.serviceType = type;
}

// step2 选择套餐或自定义
const handleMealSelected = (meal: Meal) => {
  tradeData.value.meal = meal;
  currentStep.value = 'ThirdStep'
}

// step2 选择自定义
const handleCustomSelected = () => {
  currentStep.value = 'CustomizeMeals'
}

// step2 自定义完成
const handleCustomFinished = (meal: Meal) => {
  tradeData.value.meal = meal;
  currentStep.value = 'ThirdStep';
}

// step3 填写地址完成
const handleAddressFilled = (address: { location: string; details: string }) => {
  tradeData.value.address = address;
  currentStep.value = 'FourthStep';
}

// step4 订单确认完成
const handleOrderConfirmed = () => {
  console.log('订单已完成:', tradeData.value);
  alert('订单已成功提交！');
  // 重置流程
  currentStep.value = 'FirstStep';
  tradeData.value = {
    serviceType: null,
    meal: null,
    address: null
  };
}
</script>


<style scoped>
.trade-main {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.trade-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  min-height: 500px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  padding: 2rem;
  overflow: hidden;
}
</style>
