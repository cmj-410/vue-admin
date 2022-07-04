export default {
  token: state => state.users.token,
  sidebarOpened: state => state.app.sidebarOpened,
  activeMenuIndex: state => state.app.activeMenuIndex,
  hasUserInfo: state => Object.keys(state.users.userInfo).length > 0
}
