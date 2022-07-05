import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/tokenTime'
import stateCode from '@/constants/stateCode'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      if (isCheckTimeout()) {
        // 登出操作
        store.dispatch('users/logout')
        return Promise.reject(new Error('token 失效'))
      }
      // 如果token存在 注入token
      config.headers.Authorization = store.getters.token
    }
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { code, msg, data } = response.data
    //   根据响应成功与否决定下面的操作
    if (code === 200) {
      ElMessage.success(msg)
      return data
    } else {
      // 业务错误
      ElMessage.error(msg) // 提示错误消息
      return Promise.reject(new Error(msg))
    }
  },
  error => {
    // 处理 token 超时问题
    if (error.response?.data?.code === stateCode.AUTH_ERROR) {
      // token超时
      store.dispatch('users/logout')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
