import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element-plus'
import 'normalize.css'
import '@/styles/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

// 权限控制模块
import './permission'
// 权限指令
import useDirectives from '@/directives/index'

const app = createApp(App)
installElementPlus(app)
useDirectives(app)
app.use(router).use(store).mount('#app')
