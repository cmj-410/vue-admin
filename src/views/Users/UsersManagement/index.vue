<template>
  <div class="formStyle" ref="queryForm">
    <el-form :inline="true" :model="formInline">
      <el-form-item label="用户id：">
        <el-input v-model="formInline.user" placeholder="输入用户id" />
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="formInline.user" placeholder="输入用户名" />
      </el-form-item>
      <el-form-item label="用户状态：">
        <el-select v-model="formInline.state" placeholder="选择状态">
          <el-option label="正常" :value="1" />
          <el-option label="停用" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="tableStyle">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userId" label="用户ID" min-width="80" />
      <el-table-column prop="userName" label="用户名" min-width="80" />
      <el-table-column prop="mobile" label="手机号" min-width="80" />
      <el-table-column prop="role" label="角色列表" min-width="80" />
      <el-table-column prop="state" label="状态" min-width="80" />
      <el-table-column
        prop="lastLoginTime"
        label="上次登录时间"
        min-width="80"
      />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiUsersList } from '@/api/users'
const formInline = ref({
  userName: '',
  userId: null,
  state: 1,
  pageCurrent: 1,
  pageSize: 10
})
const queryForm = ref(null)
const tableData = ref()

const getTableData = async () => {
  const res = await apiUsersList(formInline.value)
  tableData.value = res.list
  return res
}
getTableData()

const onSubmit = () => {
  console.log(queryForm.value)
  console.log('submit!')
}
</script>

<style scoped>
.formStyle {
  box-shadow: 1px 1px 2px 2px #ccc;
  padding: 10px;
}
.tableStyle {
  margin-top: 20px;
}
</style>
