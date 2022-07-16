<template>
  <div>
    <BaseTabelLayout>
      <template #queryHeader>
        <el-form :inline="true" :model="queryFormParams">
          <el-form-item label="用户id：">
            <el-input
              v-model="queryFormParams.userId"
              placeholder="输入用户id"
              maxlength="10"
              clearable
            />
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input
              v-model="queryFormParams.userName"
              placeholder="输入用户名"
              maxlength="10"
              clearable
            />
          </el-form-item>
          <el-form-item label="用户状态：">
            <el-select
              v-model="queryFormParams.state"
              placeholder="选择状态"
              clearable
            >
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
              :loading="isloading"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </template>

      <template #optionBtn>
        <el-button
          type="primary"
          style="margin-bottom: 10px"
          @click="addUserClick"
          >新增用户</el-button
        >
        <div class="floatRight">
          <el-button type="success" @click="importUsers">导入</el-button>
          <el-button type="info" @click="exportUsers" :loading="loading"
            >导出</el-button
          >
        </div>
      </template>

      <template #tablePart>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="userId" label="用户ID" min-width="60" />
          <el-table-column prop="userName" label="用户名" min-width="60" />
          <el-table-column prop="mobile" label="手机号" min-width="60" />
          <el-table-column prop="role" label="角色列表" min-width="60">
            <template #default="scope">
              <template v-for="item in scope.row.role" :key="item">
                <el-tag
                  size="small"
                  :type="roleCode2name[item].tagType ?? 'info'"
                  >{{
                    roleCode2name[item].label ?? item + '(前端设置角色信息)'
                  }}</el-tag
                >
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" min-width="60">
            <template #default="scope">
              {{ scope.row.state === 1 ? '正常' : '停用' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="lastLoginTime"
            label="上次登录时间"
            min-width="80"
            sortable
          >
            <template #default="scope">
              {{ scope.row.lastLoginTime.split('T')[0] }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                link
                type="primary"
                @click.prevent="editUser(scope.row)"
              >
                <el-icon><Edit /></el-icon>
                <span style="margin-left: 3px">编辑</span>
              </el-button>
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="确认删除该用户么?"
                @confirm="deleteUser(scope.row)"
              >
                <template #reference>
                  <el-button link type="primary">
                    <el-icon><Delete /></el-icon>
                    <span style="margin-left: 3px">删除</span>
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template #footerPart>
        <el-config-provider :locale="zhCn">
          <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageChange"
            :current-page="queryFormParams.pageCurrent"
            :page-size="queryFormParams.pageSize"
            :page-sizes="[5, 10, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRows"
          ></el-pagination>
        </el-config-provider>
      </template>
    </BaseTabelLayout>
    <OptionModal
      v-model="isVisible"
      :userId="EditUserId"
      :isEdit="isEdit"
      @success="getTableData"
    ></OptionModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiUsersList, apiDeleteUser } from '@/api/users'
import BaseTabelLayout from '@/components/BaseTabelLayout'
import OptionModal from './components/optionModal.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import noFrequentlyClick from '@/utils/noFrequentlyClick'
import { roleCode2name } from './utils/roleCode2name'
import { useRouter } from 'vue-router'
import { USER_RELATIONS, USER_RELATIONS_RE } from './importUsers/transKey'

const queryFormParams = ref({
  userName: '',
  userId: null,
  state: null,
  pageCurrent: 1,
  pageSize: 10
})

const isloading = ref(false)
const tableData = ref([])
const totalRows = ref(0)
const isVisible = ref(false)
const EditUserId = ref()
const isEdit = ref(false)

// 查询用户信息列表
const getTableData = async () => {
  const res = await apiUsersList(queryFormParams.value)
  isloading.value = false
  tableData.value = [...res.list]
  totalRows.value = res.page.total
  return res
}
// 初始展示列表
getTableData()
// 点击查询用户列表
const onSubmit = () => {
  isloading.value = true
  getTableData()
}
const editUser = async (profileData) => {
  isEdit.value = true
  isVisible.value = true
  EditUserId.value = profileData.userId
}

const deleteUser = async ({ userId }) => {
  await apiDeleteUser({ userId })
  getTableData()
}
const addUserClick = () => {
  isEdit.value = false
  isVisible.value = true
}

const pageSizeChange = (value) => {
  queryFormParams.value.pageSize = value
  getTableData()
}

const pageChange = (value) => {
  queryFormParams.value.pageCurrent = value
  getTableData()
}

const router = useRouter()
const importUsers = () => {
  router.push('/users/UsersManagement/import')
}

// 导出的loading
const loading = ref(false)
// 导出事件处理
const exportUsers = noFrequentlyClick(async () => {
  loading.value = true
  const resList = await apiUsersList({
    pageCurrent: 1,
    // 相当于所有数据
    pageSize: 9999
  })
  // 导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, resList.list)
  debugger
  const myheader = ['姓名', '联系方式', '角色', '状态']
  await excel.export_json_to_excel({
    // excel 表头
    header: myheader,
    // header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: '用户信息表',
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })
  loading.value = false
})

// 该方法负责将数组转化成二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理（数组转字符串显示）
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return roles.join(',')
      }
      return item[headers[key]]
    })
  })
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
.floatRight {
  float: right;
}
</style>
