<template>
  <h1 align="center">404</h1>
  <el-button size="large" @click="goHome" class="center">返回首页</el-button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.center {
  display: block;
  margin: 0 auto;
}
</style>
