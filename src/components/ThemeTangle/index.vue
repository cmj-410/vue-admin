<template>
  <div class="wrapper" @click="tangleThemeColor">
    <el-icon :size="20" v-if="$store.getters.themeColorDay"><Sunny /></el-icon>
    <el-icon :size="20" v-else><MoonNight /></el-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
const tangleThemeColor = () => {
  store.commit('app/tangleTheme')
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin/index.scss';
.wrapper {
  @include navBarComponentStyle;
  @include hoverStyle;
}
</style>
