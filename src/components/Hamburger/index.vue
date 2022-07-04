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
  height: #{$topHeight};
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
