import layout from '@/layout'

export default {
  path: '/sys',
  component: layout,
  redirect: '/sys/UsersManagement',
  name: 'RoleManagement',
  meta: {
    showOnMenu: true,
    title: '系统管理',
    icon: 'setting'
  },
  children: [
    {
      path: '/sys/RoleManagement',
      component: () =>
        import(
          /* webpackChunkName: "RoleManagement" */ '@/views/System/RoleManagement'
        ),
      meta: {
        showOnMenu: true,
        title: '角色管理'
      }
    }
  ]
}
