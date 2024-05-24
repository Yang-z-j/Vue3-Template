<template>
  <div class="debounceRef_container">
    <h1>{{ name }}</h1>
    <input
      type="text"
      v-model.trim="text" />
    <h1>{{ text }}</h1>
  </div>
</template>

<script setup lang="ts">
const name = ref<string>('MyDebounceRef');
const text = useDebounceRef('防抖响应式数据');
</script>

<style scoped lang="scss">
.debounceRef_container {
  text-align: center;
}
</style>
