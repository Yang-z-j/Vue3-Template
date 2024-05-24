<template>
  <div class="home-container">
    <h1>{{ name }}</h1>
    <div>
      <a
        href="https://vitejs.dev"
        target="_blank">
        <img
          src="/vite.svg"
          class="logo"
          alt="Vite logo" />
      </a>
      <a
        href="https://vuejs.org/"
        target="_blank">
        <img
          src="@/assets/static/vue.svg"
          class="logo vue"
          alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<script setup lang="ts">
const name = ref<string>('home');
</script>

<style scoped lang="scss">
.home-container {
  text-align: center;
}
</style>
