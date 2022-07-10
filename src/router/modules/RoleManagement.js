import layout from '@/layout'

export default {
  path: '/users',
  component: layout,
  redirect: '/users/UsersManagement',
  name: 'RoleManagement',
  meta: {
    showOnMenu: true,
    title: '系统管理',
    icon: 'setting'
  },
  children: [
    {
      path: '/users/RoleManagement',
      component: () =>
        import(/* webpackChunkName: "RoleManagement" */ '@/views/Users/RoleManagement'),
      meta: {
        showOnMenu: true,
        title: '角色管理'
      }
    }
  ]
}
