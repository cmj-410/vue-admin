import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/Login/LoginView.vue'
import layout from '@/layout'
import Page404 from '@/views/ErrorPage/Page404.vue'
import UsersManagementRouts from './modules/UsersManagement'
import RoleManagementRoutes from './modules/RoleManagement'
import store from '@/store'

/**
 * 私有路由表
 */
export const privateRoutes = [
  UsersManagementRouts,
  RoleManagementRoutes
]

export const publicRoutes = [
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
          import(
            /* webpackChunkName: "homePage" */ '@/views/HomePage'),
        meta: {
          title: '首页',
          icon: 'HomeFilled'
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

/**
 * 初始化路由表（退出）
 */
export function resetRouter() {
  if (store.getters.userInfo?.permission?.menus) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach(menu => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
