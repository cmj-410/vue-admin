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
          <el-dropdown-item @click="gotoHome">主页</el-dropdown-item>
          <el-dropdown-item @click="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const logout = () => {
  store.dispatch('users/logout')
}
const gotoHome = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin/index.scss';
.layoutDown-container {
  @include navBarComponentStyle;
}
</style>
