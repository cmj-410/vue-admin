<template>
  <div class="fullScreen-container" @click="changeCollapse">
    <el-icon :size="30">
      <FullScreen />
    </el-icon>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const changeCollapse = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
      .catch(err => {
        ElMessage.error('无法全屏')
        throw (err)
      })
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~@/styles/mixin/index.scss';

.fullScreen-container {
  @include navBarComponentStyle;
  @include hoverStyle;
}
</style>
