<template>
  <div class="login-container">
    <h1>{{ name }}</h1>
    <button @click="login">登录</button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const name = ref<string>('login');

function login() {
  useStorage.set('token', '123456');
  router.push('/home');
}
</script>

<style scoped lang="scss">
.login-container {
  text-align: center;
}
</style>
