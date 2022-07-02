import { apiLogin } from '@/api/users'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constants'
// import router, { resetRouter } from '@/router'
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
    }
    // async getUserInfo(context) {
    //   const res = await getUserInfo()
    //   this.commit('user/setUserInfo', res)
    //   return res
    // },
    // logout() {
    //   resetRouter()
    //   this.commit('user/setToken', '')
    //   this.commit('user/setUserInfo', {})
    //   removeAllItem()
    //   router.push('/login')
    // }
  }
}
