<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

// 获取从ep3传递过来的数据
const packageData = {
  ...route.query
}

// 定义响应式数据
const selectedPeople = ref(null)
const selectedServices = ref([])
const selectedShooter = ref(null)

// 处理下一步按钮点击
const handleNext = (e) => {
  e.preventDefault()
  
  // 获取选中的增值服务
  const serviceCheckboxes = document.querySelectorAll('input[name="service"]:checked')
  const services = Array.from(serviceCheckboxes).map(checkbox => checkbox.value)
  
  // 获取选中的摄影师
  const shooter = document.querySelector('input[name="shooter"]:checked')?.value
  
  // 准备要传递的数据
  const data = {
    ...packageData, // ep3的数据
    time: packageData.time, // 添加时间参数
    people: selectedPeople.value, // 选择的人数
    services: services, // 直接传递数组
    shooter: shooter // 选择的摄影师
  }

  router.push({
    path: '/ep5',
    query: {
      ...data,
      services: JSON.stringify(services) // 只在query中转换为JSON字符串
    }
  })
}
</script>

<template>
  <div class="tc-container">
    <h3 class="title">自定义</h3>
    <form>
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
              <input type="checkbox" name="service" :value="service" class="radio-input">
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

.sub-title {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 30px 0 20px;
}

.choices {
  width: 100%;
}

.choice-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  margin: 10px 0;
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

.desc {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0 20px;
  flex-grow: 1;
}

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
  margin-top: 30px;
}

.next button:hover {
  background-color: #ff4c4c;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

@media (max-width: 480px) {
  .tc-container {
    padding: 30px 20px;
    margin: 40px auto;
  }
  
  .title {
    font-size: 28px;
  }
  
  .sub-title {
    font-size: 20px;
  }
  
  .choice-item {
    padding: 12px 20px;
  }
  
  .next button {
    font-size: 16px;
    padding: 12px;
  }
}
</style>