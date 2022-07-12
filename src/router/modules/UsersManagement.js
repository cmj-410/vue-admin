import layout from '@/layout'

export default {
  path: '/users',
  component: layout,
  redirect: '/users/UsersManagement',
  // 这个name是菜单权限控制所必要的，通过后其children均有权限
  // 细粒度的权限由按钮控制
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
          /* webpackChunkName: "UsersImport" */ '@/views/Users/UsersManagement/importUsers'),
      meta: {
        showOnMenu: true,
        title: '导入用户数据'
      }
    },
    {
      path: '/users/PersonalDetail/:userId',
      component: () => import(/* webpackChunkName: "PersonalDetail" */ '@/views/Users/UsersManagement/usersDetail'),
      props: true,
      meta: {
        title: '个人简历展示'
      }
    }
  ]
}
