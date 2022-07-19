<template>
  <el-container>
    <el-aside
      :width="
        $store.getters.sidebarOpened
          ? $store.getters.scssVariables.sideBarClosed
          : $store.getters.scssVariables.sideBarOpened
      "
      :class="{
        dayBgColor: $store.getters.themeColorDay,
        darkBgColor: !$store.getters.themeColorDay
      }"
    >
      <SideBar />
    </el-aside>
    <el-container>
      <el-header :height="$store.getters.scssVariables.topHeight + 1">
        <NavBar />
      </el-header>
      <Tags />
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import AppMain from './components/AppMain'
import Tags from '@/components/Tags'
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';
.el-aside,
.el-container {
  height: 100vh;
}
.dayBgColor {
  background: #{$sideBarBgColor};
}
.darkBgColor {
  background: #{$darkSideBarBgColor};
}
.el-header {
  border-bottom: 1px solid lightgray;
}
</style>
