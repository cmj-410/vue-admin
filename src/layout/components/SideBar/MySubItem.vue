<template>
  <template v-if="item.children.length > 0">
    <el-sub-menu :index="item.path">
      <template #title>
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <router-link
        :to="subitem.path"
        v-for="subitem in item.children"
        :key="subitem.path"
      >
        <el-menu-item :index="subitem.path">
          {{ subitem.meta.title }}
        </el-menu-item>
      </router-link>
    </el-sub-menu>
  </template>
  <template v-else>
    <router-link :to="item.path">
      <el-menu-item :index="item.path">{{ item.meta.title }}</el-menu-item>
    </router-link>
  </template>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['item'])
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
