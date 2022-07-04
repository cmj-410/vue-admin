// 专门处理权限路由的模块
import { privateRoutes } from '@/router/index'
export default {
  namespaced: true,
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRoutes(context, menus) {
      const routes = []
      // 路由权限匹配
      menus.forEach(key => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      console.log('filterRoutes 过滤产生的权限路由')
      console.log(routes)
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      return routes
    }
  }
}
