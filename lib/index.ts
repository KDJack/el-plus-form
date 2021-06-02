import { App } from 'vue'
import ElPlusForm from './ElPlusForm.vue'
import ElPlusFormDialog from './ElPlusFormDialog.vue'
import { components } from './components/index'

const ElPlusFormUI = {
  install: (app: App, options: any) => {
    if (!options || !options.uploadImgAction) {
      console.warn('[el-plus-form warn]: 缺少属性：uploadImgAction，会导致ElPlusFormUpImg(图片上传组件)不可用!')
    } else {
      app.config.globalProperties.uploadImgAction = options.uploadImgAction
    }
    components.unshift(ElPlusForm)
    components.unshift(ElPlusFormDialog)
    components.map((component: any) => {
      app.component(component.name, component)
    })
  }
}

export default ElPlusFormUI
