<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const prop = withDefaults(
  defineProps<{
    gap: string | number //选择框中间间隙
    width: string | number //选择框宽度
  }>(),
  {
    gap: '8',
    width: '210'
  }
)

// 地址输入框的响应式引用
const addressInput = ref('')

// 添加detail输入框的ref
const detailInput = ref<HTMLInputElement | null>(null)

const router = useRouter()
const clickHandler = (e: Event) => {
  e.preventDefault(); // 阻止默认的表单提交行为

  // 获取detail输入框的值，添加默认空字符串防止undefined
  const detailValue = detailInput.value ? detailInput.value.value : '';

  router.push({
    path: '/TradeStep2',
    query: {
      address: addressInput.value,
      detail: detailValue
    }
  });
}
</script>

<template>
  <div class="dp-wrap">
    <div class="dp-container">
      <div class="choose">
        <p class="message">您想去哪?</p>
        <p class="ask">请告诉我们您的具体位置，以便我们为您安排景点和人员</p>
        <form class="dp-info" id="dpInfoForm" method="get" @submit.prevent="clickHandler">
          <div class="areabox">
            <el-input v-model="addressInput" placeholder="请输入您的详细地址"
              :style="{ width: '100%', marginRight: `${prop.gap}px` }" />
          </div>
          <input ref="detailInput" class="detail" type="text" name="detail" placeholder="请输入补充信息（如门牌号等）">
          <button type="submit" class="next-button">></button>
        </form>
      </div>
    </div>
  </div>

</template>

<style scoped>
.areabox {
  display: flex;
  align-items: center;
  margin-bottom: 100px;
}

.dp-wrap {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 20px;
}

.dp-container {
  background-color: #fff;
  height: 500px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  position: relative;
}

.choose {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.message {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.ask {
  text-align: center;
  font-size: 15px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
}

.detail {
  width: 80%;
  margin-left: 30px;
  padding: 12px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.detail:focus {
  border-color: #009dff;
}

.detail::placeholder {
  color: #cbd5dc;
}

.next-button {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  font-size: 32px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border: none;
  background-color: #009dff;
  color: white;
  border-radius: 50%;
  cursor: pointer;
}

.next-button:hover {
  background-color: #007acc;
}
</style>
