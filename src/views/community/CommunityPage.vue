<template>
  <HeaderComponent />

  <main class="community-main">
    <BlogsSection class="blogs-section" />
  </main>


  <FooterComponent />
</template>

<script setup lang="ts">
import BlogsSection from '@/components/BlogsSection.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';


</script>

<style scoped>
.community-main {
  max-width: 1100px;
  margin: 2rem auto 0 auto;
  padding: 0 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
</style>
