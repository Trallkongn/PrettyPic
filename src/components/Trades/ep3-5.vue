<template>
  <div class="tc-container">
    <h3 class="title">选择摄影师</h3>
    <form>
      <div class="choices">
        <ol type="I">
          <li class="choice-item">
            <label class="choice-content">
              <input type="radio" name="shooter" value="专业" class="radio-input" v-model="selectedShooter">
              <span class="pre">专业</span>
              <span class="desc">专业摄影师，经验丰富，设备齐全</span>
            </label>
          </li>
          <li class="choice-item">
            <label class="choice-content">
              <input type="radio" name="shooter" value="业余爱好者" class="radio-input" v-model="selectedShooter">
              <span class="pre">业余</span>
              <span class="desc">业余爱好者（性价比首选，有一定能力）</span>
            </label>
          </li>
        </ol>
        <div class="next">
          <button type="submit" @click.prevent="handleNext">下一步</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const selectedShooter = ref('')
const route = useRoute()
const router = useRouter()

const handleNext = () => {
  // 从路由参数中获取ep3的数据
  const ep3Data = {
    province: route.query.province,
    city: route.query.city,
    area: route.query.area,
    detail: route.query.detail,
    type: route.query.type,
    package: route.query.package,
    time: route.query.time // 添加时间参数
  }
  
  // 跳转到ep5页面并传递所有数据
  router.push({
    path: '/ep5',
    query: {
      ...ep3Data,
      shooter: selectedShooter.value
    }
  })
}
</script>

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
  
  .choice-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  
  .desc {
    margin: 10px 0;
  }

  .next button {
    font-size: 16px;
    padding: 12px;
  }
}
</style>