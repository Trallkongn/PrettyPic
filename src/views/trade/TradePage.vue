<template>
  
</template>

<script setup lang="ts">
import { markRaw, ref } from 'vue'
import FirstStep from '@/components/Trades/FirstStep.vue';

const componentsMap = ref({
  FirstStep: markRaw(FirstStep),
})

</script>


<style scoped></style>
