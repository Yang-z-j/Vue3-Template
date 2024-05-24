<template>
  <div class="index_container">
    <h1>{{ name }}</h1>
  </div>
</template>

<script setup lang="ts">
const name = ref<string>('error');
</script>

<style scoped lang="scss">
.index_container {
  text-align: center;
}
</style>
