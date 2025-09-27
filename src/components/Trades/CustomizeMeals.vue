<template>
  <div class="CustomizeMeals-container">
    <h3 class="title">自定义</h3>
    <form @submit.prevent="handleSubmit">
      <div class="choices">
        <div class="nop">
          <h4 class="sub-title">选择人数</h4>
          <div class="choice-item" v-for="(option, index) in [
            { label: '1人 10元', value: 1 },
            { label: '2人 20元', value: 2 },
            { label: '3人 30元', value: 3 },
            { label: '4人 30元', value: 4 },
            { label: '5人及以上 50元', value: 5 }
          ]" :key="index">
            <label class="choice-content">
              <input type="radio" name="pnumber" :value="option.value" class="radio-input" v-model="selectedPeople">
              <span class="desc">{{ option.label }}</span>
            </label>
          </div>
        </div>
        <div class="more-service">
          <h4 class="sub-title">增值服务</h4>
          <div class="choice-item" v-for="(service, index) in [
            '化妆造型 10元',
            '照片加印 10元',
            '服装租凭 10元',
            '相框装裱 10元',
            '道具提供 10元',
            '电子相册制作 10元'
          ]" :key="index">
            <label class="choice-content">
              <input type="checkbox" name="service" :value="service" class="radio-input" v-model="selectedServices">
              <span class="desc">{{ service }}</span>
            </label>
          </div>
        </div>
        <div class="shooter">
          <h4 class="sub-title">选择摄影师</h4>
          <div class="choice-item">
            <label class="choice-content">
              <input type="radio" name="shooter" value="专业" class="radio-input" v-model="selectedShooter">
              <span class="desc">专业摄影师</span>
            </label>
          </div>
          <div class="choice-item">
            <label class="choice-content">
              <input type="radio" name="shooter" value="业余爱好者" class="radio-input" v-model="selectedShooter">
              <span class="desc">业余爱好者（性价比首选，有一定能力）</span>
            </label>
          </div>
        </div>
        <div class="next">
          <button type="submit" class="next-button">下一步</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Meal } from '@/types/trade.ts'

const selectedPeople = ref<number | null>(null)
const selectedServices = ref<string[]>([])
const selectedShooter = ref<string>('')

const emit = defineEmits<{
  (e: 'custom-finished', meal: Meal): void
}>()

const handleSubmit = () => {
  // 检查必选项
  if (!selectedPeople.value) {
    alert('请选择人数')
    return
  }

  if (!selectedShooter.value) {
    alert('请选择摄影师')
    return
  }

  // 构造meal对象
  const customMeal: Meal = {
    id: Date.now(), // 临时ID
    name: '自定义套餐',
    description: `人数: ${selectedPeople.value}人, 摄影师: ${selectedShooter.value}`,
    price: calculatePrice(),
    features: [...selectedServices.value]
  }

  // 发送数据
  emit('custom-finished', customMeal)
}

const calculatePrice = (): number => {
  let price = 0

  // 基础价格根据人数
  switch (selectedPeople.value) {
    case 1:
      price = 10
      break
    case 2:
      price = 20
      break
    case 3:
      price = 30
      break
    case 4:
      price = 30
      break
    case 5:
      price = 50
      break
    default:
      price = 10
  }

  // 增值服务每项10元
  price += selectedServices.value.length * 10

  // 摄影师类型价格
  if (selectedShooter.value === '专业') {
    price += 50
  }

  return price
}
</script>

<style scoped>
.CustomizeMeals-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.title {
  color: #222;
  margin-bottom: 1rem;
}

.choices {
  width: 100%;
  max-width: 500px;
  margin-top: 1rem;
}

.sub-title {
  color: #ff9800;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.choice-item {
  margin-bottom: 0.8rem;
}

.choice-content {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-input {
  margin-right: 0.5rem;
}

.desc {
  color: #222;
}

.next {
  margin-top: 2rem;
  text-align: center;
}

.next-button {
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
  max-width: 200px;
}

.next-button:hover {
  background-color: #f57c00;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
