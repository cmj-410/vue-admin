<template>
  <el-container>
    <el-aside :width="$store.getters.sidebarOpened ? '64px' : '200px'">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header height="50px">
        <NavBar />
      </el-header>
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
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background: lightgray;
}
.el-header {
  border-bottom: 1px solid lightgray;
}
</style>
