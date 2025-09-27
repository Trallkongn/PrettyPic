<template>
  <div class="SecondStep-container">
    <h1>第二步</h1>
    <h2>请选择套餐或者自定义</h2>
    <div class="meals">
      <div class="meal" v-for="meal in Meals" :key="meal.id" @click="chooseMeal(meal)">
        <div class="meal-card">
          <h3>{{ meal.name }}</h3>
          <p class="description">{{ meal.description }}</p>
          <div class="features">
            <span v-for="(feature, index) in meal.features" :key="index" class="feature-tag">
              {{ feature }}
            </span>
          </div>
          <div class="price">¥{{ meal.price }}</div>
          <button class="select-button">选择套餐</button>
        </div>
      </div>
      <!-- 添加自定义套餐选项 -->
      <div class="meal custom-meal" @click="chooseCustom">
        <div class="meal-card">
          <h3>自定义套餐</h3>
          <p class="description">根据您的需求定制专属拍摄方案</p>
          <div class="features">
            <span class="feature-tag">灵活定制</span>
            <span class="feature-tag">个性搭配</span>
            <span class="feature-tag">专属服务</span>
          </div>
          <div class="price">???</div>
          <button class="select-button">自定义</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Meal } from '@/types/trade.ts'

const Meals = ref<Meal[]>([
  {
    id: 1,
    name: '套餐一',
    description: '1人 + 化妆造型 + 道具提供 + 服装租凭',
    price: 99,
    features: ['1人', '化妆造型', '道具提供', '服装租凭']
  },
  {
    id: 2,
    name: '套餐二',
    description: '2-3人 + 照片加印 + 相框',
    price: 128,
    features: ['2-3人', '照片加印', '相框']
  },
  {
    id: 3,
    name: '套餐三',
    description: '5人及以上 + 电子相册制作',
    price: 128,
    features: ['5人及以上', '电子相册制作']
  }
])

const emit = defineEmits<{
  (e: 'meal-selected', meal: Meal): void,
  (e: 'custom-selected'): void
}>()

const chooseMeal = (meal: Meal) => {
  console.log('选择套餐：', meal.name)
  emit('meal-selected', meal)
}

// 添加自定义套餐选择方法
const chooseCustom = () => {
  console.log('选择自定义套餐')
  emit('custom-selected')
}
</script>

<style scoped>
.SecondStep-container {
  position: relative;
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.meals {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
}

.meal {
  flex: 1;
  max-width: 260px;
}

.meal-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.meal-card:hover {
  box-shadow: 0 6px 24px rgba(255, 152, 0, 0.18);
  transform: translateY(-4px) scale(1.03);
}

.meal-card h3 {
  margin: 0 0 0.7rem 0;
  color: #ff9800;
  font-size: 1.3rem;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.features {
  margin-bottom: 1rem;
}

.feature-tag {
  display: inline-block;
  background-color: #fff3e0;
  color: #ff9800;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin: 0.2rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff9800;
  margin: 0.5rem 0;
}

.select-button {
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  transition: background-color 0.2s;
  margin-top: auto;
}

.select-button:hover {
  background-color: #f57c00;
}
</style>
