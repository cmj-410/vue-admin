import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element-plus'
import 'normalize.css'
// 权限控制模块
import './permission'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
