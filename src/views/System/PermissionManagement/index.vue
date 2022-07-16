<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="permissionCode"
      :tree-props="{ children: 'children' }"
      border
      default-expand-all
      max-height="550"
    >
      <el-table-column prop="permissionName" label="权限名" min-width="80" />
      <el-table-column prop="permissionCode" label="权限代码" min-width="80" />
      <el-table-column prop="permissionType" label="权限类型" min-width="80">
        <template #default="scope">
          <el-tag size="small" v-if="scope.row.permissionType === 'menu'">
            菜单
          </el-tag>
          <el-tag type="success" size="small" v-else> 权限点 </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="是否启用" min-width="80">
        <template #default="scope">
          <el-switch
            v-model="scope.row.state"
            size="large"
            :active-value="1"
            :inactive-value="0"
            active-text="开启"
            inactive-text="关闭"
            @change="changePermissionState(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { apiAllPermission, apiChangePermissionState } from '@/api/permission'

const tableData = ref([])
const changePermissionState = ({ permissionCode, state }) => {
  apiChangePermissionState({
    permissionCode,
    state
  })
}

const getAllpermissions = async () => {
  tableData.value = await apiAllPermission()
}
// 初始获取完整权限数据
getAllpermissions()
</script>

<style lang="scss" scoped>
::v-deep {
  .el-table {
    .cell {
      text-align: center;
    }
  }
}
</style>
