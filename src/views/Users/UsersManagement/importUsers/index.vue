<template>
  <UploadFile :onSuccess="onSuccess" />
</template>

<script setup>
import UploadFile from '@/components/UploadFile'
import { USER_RELATIONS } from './transKey'
import { apiImportUsers } from '@/api/users'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
const router = useRouter()
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  try {
    await apiImportUsers(updateData)
    await router.push('/users/UsersManagement')
    // 因为keep-alive的原因，这里再主动刷新一下
    router.go(0)
  } catch (err) {
    ElMessageBox.alert(err.message, '用户导入错误信息', {
      confirmButtonText: '确定'
    })
  }
}

/**
 * 筛选数据
 */
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      // role字段需要数组的格式
      if (key === '角色') {
        userInfo[USER_RELATIONS[key]] = item[key].split(',')
      } else {
        userInfo[USER_RELATIONS[key]] = item[key]
      }
    })
    arr.push(userInfo)
  })
  return arr
}
</script>
