<template>
  <div class="wrapper">
    <el-dialog
      :model-value="modelValue"
      @open="initDialog"
      @close="close"
      :width="400"
    >
      <template #header>
        <div class="dialogHeader">{{ dialogTitle }}</div>
      </template>
      <div v-if="!$props.roleId" style="margin: 10px 0">
        <el-form ref="addRoleRef" :rules="newRoleRule" :model="newRole">
          <el-form-item prop="roleCode" label="角色代码">
            <el-input v-model="newRole.roleCode"></el-input>
          </el-form-item>
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="newRole.roleName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-scrollbar>
        <div style="height: 300px">
          <el-tree
            ref="treeRef"
            :data="permissionTree"
            show-checkbox
            default-expand-all
            node-key="permissionCode"
            :check-strictly="true"
            highlight-current
            :props="defaultProps"
          />
        </div>
      </el-scrollbar>
      <template #footer>
        <div class="footerWrapper">
          <el-button @click="close">取消</el-button>
          <el-button @click="commit">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { apiAllPermission } from '@/api/permission'
import { apiRolePermission, apiEditRole, apiAddRole } from '@/api/roles'

const dialogTitle = ref('')
const newRole = ref({
  roleCode: '',
  roleName: ''
})
const newRoleRule = {
  roleCode: [
    {
      required: true,
      message: '请输入角色代码'
    }
  ],
  roleName: [
    {
      required: true,
      message: '请输入角色名'
    }
  ]
}
const treeRef = ref(null)
const addRoleRef = ref(null)
const permissionTree = ref([])
const roleHasPermissionList = ref([])
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: Number
  }
})
const emits = defineEmits(['update:modelValue', 'successAdd'])

const initDialog = async () => {
  if (props.roleId) {
    dialogTitle.value = '编辑角色权限'
  } else {
    dialogTitle.value = '新增角色'
  }
  await getAllPermission()
  if (props.roleId) {
    getRolePermission(props.roleId)
  }
}

const getAllPermission = async () => {
  permissionTree.value = await apiAllPermission()
}

const getRolePermission = async (roleId) => {
  roleHasPermissionList.value = await apiRolePermission({ roleId })
  treeRef.value.setCheckedKeys(
    roleHasPermissionList.value.permissionList,
    false
  )
}

// 新增或编辑角色的dialog确认点击
const commit = async () => {
  const nodeList = treeRef.value?.getCheckedNodes(false, false)
  const menuList = []
  const pointsList = []
  nodeList.forEach((item) => {
    if (item.permissionType === 'menu') {
      menuList.push(item.permissionCode)
    }
    if (item.permissionType === 'point') {
      pointsList.push(item.permissionCode)
    }
  })
  if (props.roleId) {
    await apiEditRole({
      roleId: props.roleId,
      permission: {
        menus: menuList,
        points: pointsList
      }
    })
  } else {
    addRoleRef.value.validate(async (isValidate) => {
      if (!isValidate) return
      await apiAddRole({
        roleCode: newRole.value.roleCode,
        roleName: newRole.value.roleName,
        permission: {
          menus: menuList,
          points: pointsList
        }
      })
      // 置空
      newRole.value = {
        roleCode: '',
        roleName: ''
      }
      emits('successAdd')
    })
  }

  close()
}

// 传过来的visible变量要这么改变
const close = () => {
  // 将权限树的选择去除
  treeRef.value.setCheckedKeys([], false)
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.dialogHeader {
  font: 25px;
  text-align: center;
}
::v-deep .el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}
.footerWrapper {
  display: flex;
  justify-content: center;
}
</style>
