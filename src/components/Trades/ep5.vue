<template>
  <div class="tc-container">
    <h3 class="title">结算信息</h3>
    <div class="choices">
      <div class="totalprice">
        <span>总金额：</span>{{ total }}元
      </div>
      <div class="detail-info">
        <div class="choice-item">
          <span class="desc">套餐：{{ packageData.package }} {{ msg }}</span>
        </div>
        <div class="choice-item" v-if="packageData.package === '自定义'">
          <span class="desc">人数：{{ packageData.people }}</span>
        </div>
        <div class="choice-item" v-else>
          <span class="desc">支持人数：{{ 
            packageData.package === '套餐一' ? '1人' :
            packageData.package === '套餐二' ? '2-3人' :
            '5人及以上'
          }}</span>
        </div>
        <div class="choice-item" v-if="packageData.package === '自定义'">
          <span class="desc">增值服务：{{ packageData.services.join(', ') }}</span>
        </div>
        <div class="choice-item">
          <span class="desc">摄影师：{{ packageData.shooter }}</span>
        </div>
        <div class="choice-item">
          <span class="desc">拍摄类型：{{ packageData.type }}</span>
        </div>
        <div class="choice-item">
          <span class="desc">拍摄地点：{{ packageData.province }} {{ packageData.city }} {{ packageData.area }} {{ packageData.detail }}</span>
        </div>
        <div class="choice-item">
          <span class="desc">拍摄时间：{{ packageData.time }}</span>
        </div>
      </div>
      <div class="next">
        <button type="text" @click="handleCancel">取消</button>
        <button type="text" @click="handleConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()

// 修改数据获取方式
const packageData = {
  ...route.query,
  services: route.query.services ? JSON.parse(route.query.services) : [],
  people: route.query.people || 1, // 添加默认值
  shooter: route.query.shooter || '业余爱好者' // 添加默认值
}

const packageDetail = {
  '套餐一': '(1人 + 化妆造型 + 道具提供 + 服装租凭)',
  '套餐二': '(2-3人 + 照片加印 + 相框)',
  '套餐三': '(5人及以上 + 电子相册制作)'
}

const msg = computed(() => {
  return packageDetail[packageData.package] || ''
})

// 计算总金额
const total = computed(() => {
  let sum = 0
  
  // 判断是自定义套餐还是固定套餐
  if (packageData.package === '自定义') {
    // 人数价格
    const peoplePrice = {
      1: 10,
      2: 20,
      3: 30,
      4: 30,
      5: 50
    }
    sum += peoplePrice[packageData.people] || 0
    
    // 增值服务价格（每个服务10元）
    sum += packageData.services.length * 10
  } else {
    // 固定套餐价格
    const packagePrice = {
      '套餐一': 99,
      '套餐二': 128,
      '套餐三': 128
    }
    sum += packagePrice[packageData.package] || 0
  }
  
  // 摄影师价格（两种分支都适用）
  if (packageData.shooter === '专业') {
    sum += 30
  } else {
    sum += 10
  }
  
  return sum
})

// 处理取消按钮
const handleCancel = () => {
  router.push('/')
}

// 处理确定按钮
const handleConfirm = () => {
  router.push({
    path: '/ep6',
    query: {
      ...route.query, // 使用完整的路由查询参数
      total: total.value
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

.totalprice {
  font-size: 24px;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 20px;
  text-align: center;
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
}

.desc {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0 20px;
  flex-grow: 1;
}

.next {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.next button {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next button:first-child {
  background-color: #ccc;
}

.next button:last-child {
  background-color: #ff6b6b;
}

.next button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
    padding: 12px 20px;
  }
  
  .next button {
    font-size: 16px;
    padding: 12px;
  }
}
</style>