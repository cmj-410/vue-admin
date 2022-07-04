<template>
  <div class="login-container">
    <div class="centerPanel">
      <h2>vue-admin 后台系统</h2>
      <el-form
        label-position="top"
        label-width="100px"
        :model="loginForm"
        class="login-form"
        :rules="formRules"
        ref="loginFromRef"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="loginForm.userName"
            maxlength="20"
            size="large"
            clearable
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            maxlength="20"
            size="large"
            show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            style="width: 100%"
            @click="clickLogin"
            :loading="isLoading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import formRules from './loginFromRules'

const loginForm = ref({
  userName: '',
  password: ''
})
const loginFromRef = ref(null)
const isLoading = ref(false)

const store = useStore()
const router = useRouter()
const clickLogin = () => {
  loginFromRef.value.validate((valid) => {
    if (!valid) {
      return
    }
    isLoading.value = true
    store
      .dispatch('users/login', loginForm.value)
      .then(() => {
        isLoading.value = false
        // 登录后操作，还会经过路由守卫进而去获取菜单权限列表
        router.push('/')
      })
      .catch(() => {
        isLoading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: lightslategray;
  position: relative;
  overflow: hidden;
  .centerPanel {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h2 {
      text-align: center;
    }
    .login-form {
      width: 400px;
      background: white;
      padding: 30px;
    }
  }
}
// 去除浏览器自动填入密码后的样式
:v-deep(.el-input) {
  input:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset;
  }
}
</style>
