import { App } from 'vue'
import ElPlusForm from './ElPlusForm.vue'
import ElPlusFormDialog from './ElPlusFormDialog.vue'
import { components } from './components/index'

const ElPlusFormUI = {
  install: (app: App) => {
    components.unshift(ElPlusForm)
    components.unshift(ElPlusFormDialog)
    components.map((component: any) => {
      app.component(component.name, component)
    })
  }
}

export default ElPlusFormUI
