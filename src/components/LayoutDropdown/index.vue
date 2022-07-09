<template>
  <div class="layoutDown-container">
    <el-dropdown>
      <span>
        选项
        <el-icon>
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
const logout = () => {
  store.dispatch('users/logout')
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin/index.scss';
.layoutDown-container {
  @include navBarComponentStyle;
}
</style>
