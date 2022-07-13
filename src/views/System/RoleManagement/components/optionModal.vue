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
        highlight-current
        :props="defaultProps"
      />
      <template #footer>
        <div class="footerWrapper">
          <el-button @click="close">取消</el-button>
          <el-button @click="getCheckedNodes">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { apiRolePermission, apiEditUser } from '@/api/permission'

const treeRef = ref(null)
const permissionTree = ref([])
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

const initDialog = async (roleId) => {
  // await getRolePermission(roleId)
}

const getRolePermission = async (roleId) => {
  permissionTree.value = await apiRolePermission({ roleId })
}

const getCheckedNodes = async () => {
  await apiEditUser(treeRef.value?.getCheckedNodes(false, false))
  close()
}

// 传过来的visible变量要这么改变
const close = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.footerWrapper {
  display: flex;
  justify-content: center;
}
</style>
