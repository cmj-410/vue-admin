<template>
  <div class="wrapper">
    <div class="floatLeft">
      <Hamburger />
    </div>
    <div class="floatLeft">
      <Breadcrumb />
    </div>
    <div class="rightItem flexRow">
      <ThemeTangle />
      <LayoutDropdown />
    </div>
  </div>
</template>

<script setup>
import LayoutDropdown from '@/components/LayoutDropdown'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ThemeTangle from '@/components/ThemeTangle'
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.wrapper {
  // height: #{$topHeight};
  overflow: hidden;
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
}
</style>
