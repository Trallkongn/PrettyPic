<template>
  <div class="navContainer">
    <div class="nav">
      <span class="nav-item">{{ msg1 }}</span>
      <span class="separator">/</span>
      <span class="nav-item">{{ msg2 }}</span>
      <span class="separator">/</span>
      <span class="nav-item">{{ msg3 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const msg1 = ref("首页");
const msg2 = ref("摄影作品");
const msg3 = ref("标题");
</script>

<style scoped>
.navContainer {
  width: 100%;
  height: 40px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 0 20px;
  box-sizing: border-box;
}

.nav {
  line-height: 40px;
  color: #6c757d;
  font-size: 14px;
}

.nav-item {
  cursor: pointer;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #007bff;
}

.separator {
  margin: 0 8px;
  color: #adb5bd;
}
</style>
