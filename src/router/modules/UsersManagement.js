import layout from '@/layout'

export default {
  path: '/sys',
  component: layout,
  redirect: '/sys/UsersManagement',
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
      path: '/sys/UsersManagement',
      component: () =>
        import(
          /* webpackChunkName: "UsersManagement" */ '@/views/System/UsersManagement'
        ),
      meta: {
        showOnMenu: true,
        title: '用户管理'
      }
    },
    {
      path: '/users/UsersManagement/import',
      component: () =>
        import(
          /* webpackChunkName: "UsersImport" */ '@/views/System/UsersManagement/importUsers'
        ),
      meta: {
        title: '导入用户数据'
      }
    },
    {
      path: '/users/PersonalDetail/:userId',
      component: () =>
        import(
          /* webpackChunkName: "PersonalDetail" */ '@/views/System/UsersManagement/usersDetail'
        ),
      props: true,
      meta: {
        title: '个人简历展示'
      }
    }
  ]
}
