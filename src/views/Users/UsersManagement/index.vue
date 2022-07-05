<template>
  <BaseTabelLayout>
    <template #queryHeader>
      <el-form :inline="true" :model="queryFormParams">
        <el-form-item label="用户id：">
          <el-input v-model="queryFormParams.userId" placeholder="输入用户id" />
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input
            v-model="queryFormParams.userName"
            placeholder="输入用户名"
          />
        </el-form-item>
        <el-form-item label="用户状态：">
          <el-select v-model="queryFormParams.state" placeholder="选择状态">
            <el-option label="正常" :value="1" />
            <el-option label="停用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="
              () => {
                queryFormParams.pageCurrent = 1
                onSubmit()
              }
            "
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </template>

    <template #tablePart>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="userId" label="用户ID" min-width="80" />
        <el-table-column prop="userName" label="用户名" min-width="80" />
        <el-table-column prop="mobile" label="手机号" min-width="80" />
        <el-table-column prop="role" label="角色列表" min-width="80" />
        <el-table-column prop="state" label="状态" min-width="80">
          <template #default="scope">
            {{ scope.row.state === 1 ? '正常' : '停用' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="上次登录时间"
          min-width="80"
        >
          <template #default="scope">
            {{ scope.row.lastLoginTime.split('T')[0] }}
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button link type="primary" @click.prevent="editUser(scope.row)">
              <el-icon><edit /></el-icon>
              <span style="margin-left: 3px">编辑用户</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template #footerPart>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageChange"
        :current-page="queryFormParams.pageCurrent"
        :page-size="queryFormParams.pageSize"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRows"
      ></el-pagination>
    </template>
  </BaseTabelLayout>
  <OptionModal
    v-model="isVisible"
    :userId="EditUserId"
    @success="getTableData"
  ></OptionModal>
</template>

<script setup>
import { ref } from 'vue'
import { apiUsersList } from '@/api/users'
import BaseTabelLayout from '@/components/BaseTabelLayout'
import OptionModal from './components/optionModal.vue'

const queryFormParams = ref({
  userName: '',
  userId: null,
  state: null,
  pageCurrent: 1,
  pageSize: 10
})

const tableData = ref([])
const totalRows = ref(0)
const isVisible = ref(false)
const EditUserId = ref()

const getTableData = async () => {
  const res = await apiUsersList(queryFormParams.value)
  tableData.value = [...res.list]
  // tableData.value = [...res.list, ...res.list, ...res.list]
  totalRows.value = res.page.total
  return res
}
// 初始展示列表
getTableData()
// 点击查询用户列表
const onSubmit = () => {
  getTableData()
}
const editUser = async (profileData) => {
  isVisible.value = true
  EditUserId.value = profileData.userId
}

const pageSizeChange = (value) => {
  queryFormParams.value.pageSize = value
  getTableData()
}

const pageChange = (value) => {
  queryFormParams.value.pageCurrent = value
  getTableData()
}
</script>

<style scoped></style>
