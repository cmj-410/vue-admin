import LoginView from '@/views/Login/LoginView.vue'
import layout from '@/layout'
import Page404 from '@/views/ErrorPage/Page404.vue'

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  // 主页放到了公共路由中，但是它们不在路由守卫的白名单中
  // 主页是登录后用户都能看到的，因此不需要后端返回权限
  {
    path: '/',
    name: 'homePage',
    redirect: '/home',
    component: layout,
    children: [
      {
        path: '/home',
        component: () =>
          import(/* webpackChunkName: "homePage" */ '@/views/HomePage'),
        meta: {
          showOnMenu: true,
          title: '首页',
          icon: 'homeFilled'
        }
      }
    ]
  },
  {
    path: '/article',
    name: 'articleList',
    redirect: '/article/list',
    component: layout,
    meta: {
      showOnMenu: true,
      title: '文章管理',
      icon: 'Document'
    },
    children: [
      {
        path: '/article/list',
        component: () =>
          import(/* webpackChunkName: "article-list" */ '@/views/Article/list'),
        meta: {
          showOnMenu: true,
          title: '文章列表'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: Page404
  }
]
