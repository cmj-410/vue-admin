import { createRouter, createWebHashHistory } from 'vue-router'
import PublicRoutes from './publicRoutes'
import UsersManagementRouts from './modules/UsersManagement'
import RoleManagementRoutes from './modules/RoleManagement'
import PermissionManagementRoutes from './modules/PermissionManagement'
import CreateArticleRoutes from './modules/CreateArticle'
import store from '@/store'

/**
 * 私有路由表
 */
export const privateRoutes = [
  UsersManagementRouts,
  RoleManagementRoutes,
  PermissionManagementRoutes,
  CreateArticleRoutes
]

/**
 * 初始化路由表（退出）
 */
export function resetRouter() {
  if (store.getters.userInfo?.permission?.menus) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: PublicRoutes
})

export default router
