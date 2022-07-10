export default {
  token: state => state.users.token,
  hasUserInfo: state => Object.keys(state.users.userInfo).length > 0,
  getCurrentUserInfo: state => state.users.userInfo,
  sidebarOpened: state => state.app.sidebarOpened,
  themeColorDay: state => state.app.themeColorDay === 'auto',
  scssVariables: state => state.app.scssVariables,
  tagsList: state => state.app.tagsList
}
