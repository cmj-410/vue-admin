export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: false
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
