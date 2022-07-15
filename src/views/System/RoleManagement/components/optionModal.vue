<template>
  <div class="wrapper">
    <el-dialog
      :model-value="modelValue"
      title="编辑用户权限"
      @open="initDialog"
      @close="close"
      :width="400"
    >
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
import { apiRolePermission, apiEditRole } from '@/api/roles'

const treeRef = ref(null)
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
    type: Number,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const initDialog = async () => {
  await getAllPermission()
  getRolePermission(props.roleId)
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
  await apiEditRole({
    roleId: props.roleId,
    permission: {
      menus: menuList,
      points: pointsList
    }
  })
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
.footerWrapper {
  display: flex;
  justify-content: center;
}
</style>
