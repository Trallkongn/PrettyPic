<template>
  <div class="ThirdStep-container">
    <h1>第三步</h1>
    <h2>请填写拍摄地址</h2>
    <div class="address-form">
      <div class="form-group">
        <label for="location">街道地址</label>
        <input id="location" v-model="address.location" type="text" placeholder="请输入具体到街道的地址" class="form-input" />
      </div>
      <div class="form-group">
        <label for="details">详细地址</label>
        <textarea id="details" v-model="address.details" placeholder="请输入更详细的地址信息，如门牌号、楼层等"
          class="form-textarea"></textarea>
      </div>
      <button @click="submitAddress" class="next-button">下一步</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Address } from '@/types/trade';

const address = ref<Address>({
  location: '',
  details: ''
})

const emit = defineEmits<{
  (e: 'address-filled', address: Address): void
}>()

const submitAddress = () => {
  if (!address.value.location.trim()) {
    alert('请输入街道地址');
    return;
  }
  console.log('填写地址：', address.value);
  emit('address-filled', address.value);
}
</script>

<style scoped>
.ThirdStep-container {
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.address-form {
  width: 80%;
  max-width: 500px;
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #222;
  font-weight: 500;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #ff9800;
  box-shadow: 0 0 0 2px rgba(255, 152, 0, 0.2);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
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
}

.next-button:hover {
  background-color: #f57c00;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
