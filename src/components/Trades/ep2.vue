<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const locationData = ref({
  province: '',
  city: '',
  area: '',
  detail: ''
})

onMounted(() => {
  locationData.value = {
    province: route.query.province,
    city: route.query.city,
    area: route.query.area,
    detail: route.query.detail
  }
  console.log('Received location data:', locationData.value)
})

const handleButtonClick = (e, type) => {
  e.preventDefault()
  router.push({
    path: '/ep3',
    query: {
      ...locationData.value,
      type: type
    }
  })
}
</script>

<template>
  <div class="dp-container">
    <div class="choose">
      <p class="message">请选择约拍类型</p>
      <form class="type" id="typeForm">
        <button id="b1" @click="(e) => handleButtonClick(e, '个人写真')" type="submit" class="bubble-btn">个人写真</button>
        <button id="b2" @click="(e) => handleButtonClick(e, '儿童摄影')" type="submit" class="bubble-btn">儿童摄影</button>
        <button id="b3" @click="(e) => handleButtonClick(e, '家庭摄影')" type="submit" class="bubble-btn">家庭摄影</button>
        <button id="b4" @click="(e) => handleButtonClick(e, 'COS跟拍')" type="submit" class="bubble-btn">COS跟拍</button>
        <button id="b5" @click="(e) => handleButtonClick(e, '商业摄影')" type="submit" class="bubble-btn">商业摄影</button>
        <button id="b6" @click="(e) => handleButtonClick(e, '跟拍')" type="submit" class="bubble-btn">跟拍</button>
        <button id="b7" @click="(e) => handleButtonClick(e, '定制')" type="submit" class="bubble-btn">定制</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.dp-container{
  background-color: #fff;
  margin-left: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 600px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.choose{
  width: 100%;
  height: 100%;
  position: relative;
}

.message{
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
}

/* 按钮 */
.bubble-btn {
  position: absolute;
  display: inline-block;
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

.bubble-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.bubble-btn:nth-child(1) {
  top: 20%;
  left: 10%;
  width: 80px;
  height: 80px;
  background-color: #ff6b6b;
  animation-delay: 0.2s;
}

.bubble-btn:nth-child(2) {
  top: 60%;
  left: 10%;
  width: 120px;
  height: 120px;
  background-color: #feca57;
  animation-delay: 0.4s;
}

.bubble-btn:nth-child(3) {
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  background-color: #1dd1a1;
  animation-delay: 0.6s;
}

.bubble-btn:nth-child(4) {
  top: 40%;
  right: 10%;
  width: 110px;
  height: 110px;
  background-color: #54a0ff;
  animation-delay: 0.8s;
}

/* 商业摄影 */
.bubble-btn:nth-child(5) {
  bottom: 20%;
  right: 10%;
  width: 90px;
  height: 90px;
  background-color: #5f27cd;
  animation-delay: 1s;
}

.bubble-btn:nth-child(6) {
  bottom: 5%;
  left: 40%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  background-color: #ff9f43;
  animation-delay: 1.2s;
}

.bubble-btn:nth-child(7) {
  top: 40%;
  left: 30%;
  width: 90px;
  height: 90px;
  background-color: #00d2d3;
  animation-delay: 1.4s;
}

@keyframes bubble {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>