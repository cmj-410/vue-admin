<template>
  <div class="hamburger-container" @click="changeCollapse">
    <el-icon :size="30">
      <Fold v-if="!$store.getters.sidebarOpened" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const changeCollapse = () => {
  store.commit('app/triggerSidebarOpened')
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin/index.scss';
.hamburger-container {
  @include navBarComponentStyle;
  @include hoverStyle;
}
</style>
