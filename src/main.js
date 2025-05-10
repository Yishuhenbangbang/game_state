import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import lazyPlugin from 'vue3-lazy'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(lazyPlugin, {
    loading: './image/id_error.jpg', // 图片加载时默认图片
    error:'./image/id_error.jpg'// 图片加载失败时默认图片
})
app.mount('#app')