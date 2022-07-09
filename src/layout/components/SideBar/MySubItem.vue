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
      <el-menu-item :index="item.path">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
      </el-menu-item>
    </router-link>
  </template>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import cssVariables from '@/styles/variables.module.scss'

const props = defineProps(['item'])
const store = useStore()
const hoverBg = computed(() => {
  if (store.getters.themeColorDay) {
    return cssVariables.menuActiveBgColor
  } else {
    return cssVariables.darkMenuActiveBgColor
  }
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.el-menu-item:hover {
  background: v-bind(hoverBg);
}
</style>
