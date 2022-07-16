import layout from '@/layout'

export default {
  path: '/sys',
  component: layout,
  redirect: '/sys/PermissionManagement',
  name: 'PermissionManagement',
  meta: {
    showOnMenu: true,
    title: '系统管理',
    icon: 'setting'
  },
  children: [
    {
      path: '/sys/PermissionManagement',
      component: () =>
        import(
          /* webpackChunkName: "PermissionManagement" */ '@/views/System/PermissionManagement'
        ),
      meta: {
        showOnMenu: true,
        title: '权限管理'
      }
    }
  ]
}
