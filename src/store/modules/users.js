import { apiLogin, apiUsersProfile } from '@/api/users'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constants'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/tokenTime'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) ?? '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { userName, password } = userInfo
      return new Promise((resolve, reject) => {
        apiLogin({
          userName,
          password: md5(password)
        })
          .then(data => {
            const token = data.token
            this.commit('users/setToken', token)
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async getUserInfo(context) {
      const res = await apiUsersProfile()
      this.commit('users/setUserInfo', res)
      return res
    },
    async logout() {
      resetRouter()
      // 和下面那个是相同的原因
      this.commit('app/clearTagList')
      // dark模式退出，重新登入模式的标记没有变回day
      this.commit('app/tangleThemeDay')
      this.commit('users/setToken', '')
      this.commit('users/setUserInfo', {})
      removeAllItem()
      await router.push('/login')
      router.go(0)
    }
  }
}
