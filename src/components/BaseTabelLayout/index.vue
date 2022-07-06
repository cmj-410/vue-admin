<template>
  <div class="wrapper">
    <div class="container">
      <el-card class="marginbottom">
        <el-scrollbar height="50px">
          <slot name="queryHeader" />
        </el-scrollbar>
      </el-card>
      <div class="optionBtn">
        <slot name="optionBtn" />
      </div>
      <div class="tableCard">
        <el-card shadow="never" class="marginbottom">
          <el-scrollbar height="338px">
            <slot name="tablePart" />
          </el-scrollbar>
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
    .marginbottom {
      margin-bottom: 20px;
    }
    .tableCard {
      .optionBtn {
        height: 42px;
        margin-bottom: 10px;
      }
    }
  }
  .footerStyle {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
  }
}
</style>
