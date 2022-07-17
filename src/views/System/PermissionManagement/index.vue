<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="permissionCode"
      :tree-props="{ children: 'children' }"
      border
      max-height="530"
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
            :disabled="
              !$store.getters.getCurrentUserInfo.permission.points.includes(
                'switchPermission'
              )
            "
            @change="changePermissionState(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template #default="scope">
          <template v-if="scope.row.permissionType === 'menu'">
            <el-button
              link
              type="primary"
              @click.prevent="addPower(scope.row.parent)"
              v-permissions="['addPermissionMenu']"
            >
              <el-icon><CirclePlus /></el-icon>
              <span style="margin-left: 3px">同级权限</span>
            </el-button>
            <el-button
              link
              type="primary"
              @click.prevent="addPower(scope.row.permissionCode)"
              v-permissions="['addPermissionPoint']"
            >
              <el-icon><CirclePlusFilled /></el-icon>
              <span style="margin-left: 3px">子级权限</span>
            </el-button>
          </template>
          <template v-else>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确认删除该权限?"
              @confirm="deletePower(scope.row.permissionCode)"
            >
              <template #reference>
                <el-button link type="primary" v-permissions="['deletePoint']">
                  <el-icon><Delete /></el-icon>
                  <span style="margin-left: 3px">删除</span>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <addModal v-model="isVisible" :parent="parent" @success="addPowerSuccess" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {
  apiAllPermission,
  apiChangePermissionState,
  apiDeletePermission
} from '@/api/permission'
import addModal from './components/optionModal.vue'

const tableData = ref([])
const isVisible = ref(false)
const parent = ref('')

// 更改权限状态
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
// 添加权限/同级或子级
const addPower = (theParent) => {
  parent.value = theParent
  isVisible.value = true
}
// 添加权限成功回调
const addPowerSuccess = () => {
  getAllpermissions()
}
const deletePower = (permissionCode) => {
  apiDeletePermission({ permissionCode })
  getAllpermissions()
}
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
