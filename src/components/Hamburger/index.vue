<template>
  <div class="hamburger-container">
    <el-icon :size="30" @click="changeCollapse">
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
@import '~@/styles/variables.scss';
.hamburger-container {
  width: #{$topHeight};
  position: relative;
  i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
