<template>
  <div class="wrapper">
    <div class="container">
      <el-card class="marginbottom">
        <slot name="queryHeader" />
      </el-card>
      <div class="tableCard">
        <el-card shadow="never" class="marginbottom">
          <slot name="tablePart" />
        </el-card>
      </div>
    </div>
    <div class="footerStyle">
      <slot name="footerPart" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  .container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    // .tableCard {
    //   height: 65vh;
    //   overflow: auto;
    // }
    .marginbottom {
      margin-bottom: 20px;
    }
  }
  .footerStyle {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
  }
}
</style>
