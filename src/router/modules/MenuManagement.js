import layout from '@/layout'

export default {
  path: '/users',
  component: layout,
  redirect: '/sys/MenuManagement',
  name: 'MenuManagement',
  meta: {
    showOnMenu: true,
    title: '系统管理',
    icon: 'setting'
  },
  children: [
    {
      path: '/sys/MenuManagement',
      component: () =>
        import(/* webpackChunkName: "MenuManagement" */ '@/views/System/MenuManagement'),
      meta: {
        showOnMenu: true,
        title: '菜单管理'
      }
    }
  ]
}
