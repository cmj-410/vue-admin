<template>
  <div class="wrapper">
    <div class="floatLeft">
      <Hamburger />
    </div>
    <div class="floatLeft">
      <Breadcrumb />
    </div>
    <div class="rightItem flexRow">
      <FullScreen />
      <ThemeTangle />
      <LayoutDropdown />
      <div class="userName">
        {{ $store.getters.getCurrentUserInfo.userName }}
      </div>
    </div>
  </div>
</template>

<script setup>
import LayoutDropdown from '@/components/LayoutDropdown'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ThemeTangle from '@/components/ThemeTangle'
import FullScreen from '@/components/FullScreen/index.vue'
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.wrapper {
  overflow: hidden;
  height: #{$topHeight};

  .floatLeft {
    float: left;
  }

  .el-header {
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
  }

  .rightItem {
    float: right;
    margin-right: 20px;
  }

  .flexRow {
    display: flex;
  }

  .userName {
    height: 50px;
    line-height: 50px;
    margin: 0 10px;
  }
}
</style>
