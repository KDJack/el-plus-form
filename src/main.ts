import { createApp } from 'vue'
import App from './App.vue'
import ElPlusFormUI from '../lib/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(ElementPlus).use(ElPlusFormUI).mount('#app')
