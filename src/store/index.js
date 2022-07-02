import { createStore } from 'vuex'
import users from './modules/users'
import getters from './getters'

export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    users
  }
})
