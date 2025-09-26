<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

// 获取从ep2传递过来的数据
const locationData = {
  province: route.query.province,
  city: route.query.city,
  area: route.query.area,
  detail: route.query.detail,
  type: route.query.type
}

// 添加时间选择状态
const selectedTime = ref('')

// 处理自定义按钮点击
const handleCustomize = (e) => {
  e.preventDefault()
  router.push({
    path: '/ep4',
    query: {
      ...locationData,
      package: '自定义',
      time: selectedTime.value
    }
  })
}

// 处理下一步按钮点击
const handleNext = (e) => {
  e.preventDefault()
  const selectedPackage = document.querySelector('input[name="package"]:checked')?.value
  router.push({
    path: '/ep3-5',
    query: {
      ...locationData,
      package: selectedPackage,
      time: selectedTime.value
    }
  })
}

const choices = [
  {
    pre:"套餐一",
    desc:"1人 + 化妆造型 + 道具提供 + 服装租凭",
    price:99,
  },
  {
    pre:"套餐二",
    desc:"2-3人 + 照片加印 + 相框",
    price:128,
  },
  {
    pre:"套餐三",
    desc:"5人及以上 + 电子相册制作",
    price:128,
  }
]
</script>

<template>
  <div class="tc-container">
    <h3 class="title">套餐选择</h3>
    <form>
      <div class="time-picker">
        <label for="time">选择时间：</label>
        <input 
          type="datetime-local" 
          id="time" 
          v-model="selectedTime" 
          :min="new Date().toISOString().slice(0,16)"
          required
        >
      </div>
      <div class="choices">
        <ol type="I">
          <li v-for="(choice,index) of choices" :key="index" class="choice-item">
            <label class="choice-content">
              <input type="radio" name="package" :value="choice.pre" class="radio-input">
              <span class="pre">{{ choice.pre }}</span>
              <span class="desc">{{ choice.desc }}</span>
              <span class="price">{{ choice.price }}元</span>
            </label>
          </li>
        </ol>
      <div class="customize">
        <button type="submit" @click="handleCustomize">自定义</button>
      </div>
      <div class="next">
        <button type="submit" @click="handleNext">下一步</button>
      </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.tc-container {
  background-color: #fafafa;
  margin: 80px auto;
  padding: 50px 40px;
  border-radius: 24px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);
  width: 90%;
  max-width: 600px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 50px;
  position: relative;
}

.title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background-color: #ff6b6b;
  border-radius: 2px;
}

.choices {
  width: 100%;
}

.choice-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  margin: 15px 0;
  background-color: #fff;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #eee;
  cursor: pointer;
}

.choice-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-color: #ff6b6b;
}

.choice-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.radio-input {
  margin-right: 15px;
  accent-color: #ff6b6b;
  transform: scale(1.2);
}

.pre {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  min-width: 80px;
}

.desc {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0 20px;
  flex-grow: 1;
}

.price {
  font-size: 22px;
  font-weight: 700;
  color: #ff6b6b;
  padding: 8px 16px;
  background-color: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
}

.customize button,
.next button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background-color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.customize button:hover,
.next button:hover {
  background-color: #ff4c4c;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

/* 添加时间选择器样式 */
.time-picker {
  width: 100%;
  margin-bottom: 30px;
}

.time-picker label {
  font-size: 18px;
  color: #2c3e50;
  margin-right: 10px;
}

.time-picker input {
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 16px;
  color: #2c3e50;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
}

.time-picker input:focus {
  outline: none;
  border-color: #ff6b6b;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

@media (max-width: 480px) {
  .tc-container {
    padding: 30px 20px;
    margin: 40px auto;
  }
  
  .title {
    font-size: 28px;
  }
  
  .choice-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  
  .desc {
    margin: 10px 0;
  }

  .customize button,
  .next button {
    font-size: 16px;
    padding: 12px;
  }

  .time-picker {
    margin-bottom: 20px;
  }
  
  .time-picker label {
    font-size: 16px;
  }
  
  .time-picker input {
    font-size: 14px;
    padding: 10px;
  }
}
</style>