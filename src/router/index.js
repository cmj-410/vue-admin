import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'layout',
    component: () => import(/* webpackChunkName: "about" */ '../layout')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
