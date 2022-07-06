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
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="editForm.userName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="editForm.state" placeholder="请选择">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="停用" :value="0"></el-option>
        </el-select>
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
import { ref, defineProps, defineEmits } from 'vue'
import { apiUsersProfile, apiEditUser, apiAddUser } from '@/api/users'
import { ElMessage } from 'element-plus'
import formRules from './rules'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  isEdit: {
    type: Boolean
  },
  userId: {
    type: Number
  }
})
const emits = defineEmits(['update:modelValue', 'success'])

const modalTitle = ref()
const editForm = ref({})
const editFormRef = ref({})

const initDialog = async () => {
  // 如果存在用户id（默认不为0），即为编辑状态
  if (props.isEdit) {
    modalTitle.value = '编辑用户'
    const userProfile = await apiUsersProfile({ userId: props.userId })
    editForm.value = userProfile
  } else {
    modalTitle.value = '新建用户'
  }
}

const clearData = () => {
  emits('update:modelValue', false)
  editForm.value = {}
}

const submitEdit = () => {
  editFormRef.value.validate(async (valide) => {
    if (valide) {
      if (props.isEdit) {
        await apiEditUser(editForm.value)
      } else {
        await apiAddUser(editForm.value)
      }
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
