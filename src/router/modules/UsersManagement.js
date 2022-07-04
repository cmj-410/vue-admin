import layout from '@/layout'

export default {
  path: '/users',
  component: layout,
  redirect: '/users/UsersManagement',
  name: 'UsersManagement',
  meta: {
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
        title: '用户管理'
      }
    }
  ]
}
