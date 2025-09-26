<template>
  <HeaderComponent />

  <main class="msg-main">
    <ChatComponent />
  </main>

  <FooterComponent />
</template>

<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ChatComponent from '@/components/ChatComponent.vue';

</script>

<style scoped>
.msg-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
