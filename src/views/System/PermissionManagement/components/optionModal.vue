<template>
  <el-dialog
    :model-value="modelValue"
    @open="initDialog"
    @close="clearData"
    :width="400"
  >
    <template #header>
      <div class="dialogHeader">{{ modalTitle }}</div>
    </template>

    <el-form
      :model="editForm"
      label-width="80px"
      :rules="formRules"
      ref="editFormRef"
    >
      <el-form-item label="权限代码" prop="permissionCode">
        <el-input v-model="editForm.permissionCode" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="权限名" prop="permissionName">
        <el-input
          v-model="editForm.permissionName"
          placeholder="请输入"
          maxlength="10"
        />
      </el-form-item>

      <el-form-item label="权限类型" prop="permissionType">
        <el-select v-model="editForm.permissionType" placeholder="选择类型">
          <el-option label="菜单权限" value="menu" />
          <el-option label="权限点" value="point" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="editForm.state">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="footerWrapper">
        <el-button type="primary" @click="submitEdit">确认</el-button>
        <el-button @click="cancelEdit">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import { apiAddPermission } from '@/api/permission'
import formRules from './formRules'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  parent: {
    type: String
  }
})
const emits = defineEmits(['update:modelValue', 'success'])
const modalTitle = ref()
const parentPower = computed(() => {
  return props.parent
})
const editForm = ref({
  parent: parentPower.value
})
const editFormRef = ref(null)
const initDialog = async () => {
  // 开始不要显示验证提示
  editFormRef.value?.resetFields()
  modalTitle.value =
    '新建' +
    (parentPower.value.length > 0 ? parentPower.value + '的子权限' : '权限')
}

const initEditForm = () => {
  editForm.value = {
    parent: parentPower.value
  }
}

const clearData = () => {
  emits('update:modelValue', false)
  initEditForm()
}

const submitEdit = async () => {
  editFormRef.value.validate(async (valide) => {
    if (valide) {
      editForm.value.parent = parentPower
      debugger
      await apiAddPermission(editForm.value)
      emits('success')
      clearData()
    }
  })
}

const cancelEdit = () => {
  clearData()
}
</script>

<style scoped>
.dialogHeader {
  font: 25px;
  text-align: center;
}
.footerWrapper {
  display: flex;
  justify-content: center;
}
</style>
