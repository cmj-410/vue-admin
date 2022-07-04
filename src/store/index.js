import { createStore } from 'vuex'
import users from './modules/users'
import app from './modules/app'
import permission from './modules/permission'
import getters from './getters'

export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    users,
    app,
    permission
  }
})
