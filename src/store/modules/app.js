export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: false,
    activeMenuIndex: '/home'
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
