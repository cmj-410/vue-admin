<template>
  <div class="title">
    <template v-if="!$store.getters.sidebarOpened">vue-admin 后台系统</template>
    <template v-else>LOGO</template>
  </div>
  <el-menu
    :default-active="curRoute"
    :uniqueOpened="true"
    style="border: none"
    :background-color="
      $store.getters.themeColorDay
        ? $store.getters.scssVariables.menuBgColor
        : $store.getters.scssVariables.darkMenuBgColor
    "
    text-color="white"
    :active-text-color="
      $store.getters.themeColorDay
        ? $store.getters.scssVariables.menuActiveFontColor
        : $store.getters.scssVariables.darkMenuActiveFontColor
    "
    :collapse="$store.getters.sidebarOpened"
    :collapse-transition="false"
  >
    <MySubItem v-for="item in routes" :item="item" :key="item.path" />
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/generateMenu'
import MySubItem from './MySubItem.vue'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  // console.log(filterRoutes)
  return generateMenus(filterRoutes)
})
console.log('生成的菜单列表')
console.log(routes.value)

const route = useRoute()
const curRoute = computed(() => route.path)
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';
.title {
  height: #{$topHeight};
  line-height: #{$topHeight};
  font: 30px;
  text-align: center;
}
</style>
