<template>
  <div class="roleManagementWrapper">
    <div class="optionBtn">
      <el-button type="primary" @click="addRole" v-permissions="['addRole']"
        >新增角色</el-button
      >
    </div>
    <el-card shadow="never">
      <el-scrollbar height="450px">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="roleId" label="角色ID" min-width="100" />
          <el-table-column prop="roleCode" label="角色代码" min-width="100" />
          <el-table-column prop="roleName" label="角色名" min-width="100" />
          <el-table-column prop="updateTime" label="更新时间" min-width="100">
            <template #default="scope">
              {{ scope.row.updateTime.split('T')[0] }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                link
                type="primary"
                @click.prevent="editRole(scope.row.roleId)"
                v-permissions="['editRole']"
              >
                <el-icon><Edit /></el-icon>
                <span style="margin-left: 3px">编辑</span>
              </el-button>
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="确认删除该角色么?"
                @confirm="deleteRole(scope.row.roleId)"
              >
                <template #reference>
                  <el-button link type="primary" v-permissions="['deleteRole']">
                    <el-icon><Delete /></el-icon>
                    <span style="margin-left: 3px">删除</span>
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-card>
    <option-modal
      v-model="isVisible"
      :roleId="editRoleId"
      @successAdd="getRoleList"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiRolesList, apiDeleteRole } from '@/api/roles'
import OptionModal from './components/optionModal.vue'

const tableData = ref([])
const isVisible = ref(false)
const editRoleId = ref()

const getRoleList = async () => {
  const res = await apiRolesList()
  tableData.value = res
}
getRoleList()

const addRole = () => {
  editRoleId.value = null
  isVisible.value = true
}
const editRole = (roleId) => {
  editRoleId.value = roleId
  isVisible.value = true
}
const deleteRole = async (roleId) => {
  await apiDeleteRole({ roleId })
  getRoleList()
}
</script>

<style lang="scss" scoped>
.optionBtn {
  height: 42px;
  margin-bottom: 10px;
}
:deep(.el-table .cell) {
   text-align: center;
}
</style>
