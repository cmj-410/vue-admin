<template>
  <div class="wrapper">
    <div class="hamburgerStyle">
      <Hamburger />
    </div>
    <Breadcrumb />
    <div class="rightItem">
      <LayoutDropdown />
    </div>
  </div>
</template>

<script setup>
import LayoutDropdown from '@/components/LayoutDropdown'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.wrapper {
  position: relative;
  height: #{$topHeight};
  .hamburgerStyle {
    display: inline-block;
  }
  .el-header {
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
  }
  .rightItem {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
