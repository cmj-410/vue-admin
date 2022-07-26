<template>
  <el-container>
    <el-aside
      :width="
        $store.getters.sidebarOpened
          ? 'fix-content'
          : $store.getters.scssVariables.sideBarOpened

      "
      :style="$store.getters.themeColorDay ?
      { background: $store.getters.scssVariables.sideBarBgColor }:
      { background: $store.getters.scssVariables.darkSideBarBgColor }"
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
.el-aside,
.el-container {
  height: 100vh;
}
.el-header {
  border-bottom: 1px solid lightgray;
}
</style>
