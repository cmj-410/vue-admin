import layout from '@/layout'

export default {
  path: '/users',
  component: layout,
  redirect: '/users/UsersManagement',
  name: 'UsersManagement',
  meta: {
    showOnMenu: true,
    title: '系统管理',
    icon: 'setting'
  },
  children: [
    {
      path: '/users/UsersManagement',
      component: () =>
        import(
          /* webpackChunkName: "UsersManagement" */ '@/views/Users/UsersManagement'),
      meta: {
        showOnMenu: true,
        title: '用户管理'
      }
    },
    {
      path: '/users/UsersManagement/import',
      component: () =>
        import(
          /* webpackChunkName: "UsersImport" */ '@/views/Users/UsersManagement/importUsers/index'),
      meta: {
        title: '导入用户数据'
      }
    }
  ]
}
