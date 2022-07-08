export default {
  token: state => state.users.token,
  hasUserInfo: state => Object.keys(state.users.userInfo).length > 0,
  sidebarOpened: state => state.app.sidebarOpened,
  themeColorDay: state => state.app.themeColorDay,
  scssVariables: state => state.app.scssVariables
}
