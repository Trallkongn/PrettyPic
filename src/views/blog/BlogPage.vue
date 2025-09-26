<template>
  <HeaderComponent />

  <main class="blog-main">
    <NavLine />
    <div class="photos-show">
      <PhotosShow />
    </div>
    <TextShow />
    <CommentsComponent />

  </main>

  <FooterComponent />
</template>

<script setup lang="ts">
import CommentsComponent from '@/components/BlogComponents/CommentsComponent.vue';
import NavLine from '@/components/BlogComponents/NavLine.vue';
import PhotosShow from '@/components/BlogComponents/PhotosShow.vue';
import TextShow from '@/components/BlogComponents/textShow.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

</script>

<style scoped>
.blog-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photos-show {
  width: 100%;
  background-color: aliceblue;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
}

.bottom-elements {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
</style>
