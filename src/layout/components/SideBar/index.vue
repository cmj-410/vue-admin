<template>
  <div class="title">
    <template v-if="!$store.getters.sidebarOpened">vue-admin 后台系统</template>
    <template v-else>LOGO</template>
  </div>
  <el-menu
    default-active="$store.getters.activeMenuIndex"
    :uniqueOpened="true"
    style="border: none"
    background-color="lightgray"
    active-text-color="yellow"
    :collapse="$store.getters.sidebarOpened"
    :collapse-transition="false"
  >
    <MySubItem v-for="item in routes" :item="item" :key="item.path" />
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
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
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.title {
  height: #{$topHeight};
  line-height: #{$topHeight};
  font: 30px;
  text-align: center;
}
</style>
