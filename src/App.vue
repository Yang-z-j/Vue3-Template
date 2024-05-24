<script setup lang="ts">
// EL国际化配置
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
