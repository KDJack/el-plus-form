import { createApp } from 'vue'
import App from './App.vue'
import ElPlusForm from './components/el-plus-form/index'

const app = createApp(App)
app.use(ElPlusForm).mount('#app')
