<template>
  <div class="userDetailWrapper">
    <h2>用户{{ props.userId }}的个人简历</h2>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['userId'])
</script>
