export default {
  token: state => state.users.token,
  sidebarOpened: state => state.app.sidebarOpened,
  hasUserInfo: state => Object.keys(state.users.userInfo).length > 0,
  themeColorDay: state => state.app.themeColorDay
}
