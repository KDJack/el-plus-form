const fs = require('fs')
const render = require('json-templater/string')
const path = require('path')
const endOfLine = require('os').EOL

// 获取组件
function getComponents(path) {
  let components = fs.readdirSync(path)
  components = components.map((componentName) => componentName.slice(0, componentName.lastIndexOf('.vue')))
  components.pop()
  components.sort((a, b) => a.length - b.length)
  return components
}

// 获取组件引入模板
function getComponentsTemplate(ComponentNames) {
  // 模板
  const IMPORT_TEMPLATE = "import {{name}} from './components/{{name}}.vue'"
  // 替换
  return ComponentNames.map((name) => render(IMPORT_TEMPLATE, { name: name }))
}

// 获取安装列表
function getInstallTemplate(ComponentNames) {
  const INSTALL_COMPONENT_TEMPLATE = '  {{name}}'
  return ComponentNames.map((name) => render(INSTALL_COMPONENT_TEMPLATE, { name: name }))
}

// 组件目录
const COMPONENTS_PATH = path.join(__dirname, '../lib/components')
// 获取组件名称
const ComponentNames = getComponents(COMPONENTS_PATH)

// 获取引入组件的文本
const includeComponentTemplate = getComponentsTemplate(ComponentNames)

// 获取安装模板
const installTemplate = getInstallTemplate(ComponentNames)

const MAIN_TEMPLATE = `import { App } from 'vue'
import ElPlusForm from './ElPlusForm.vue'
import ElPlusFormDialog from './ElPlusFormDialog.vue'
{{include}}

const components = [
  ElPlusForm,
  ElPlusFormDialog,
{{install}}
]

const ElPlusFormUI = {
  install: (app: App, options: any) => {
    if (!options || !options.uploadImgAction) {
      console.warn('[el-plus-form warn]: 缺少属性：uploadImgAction，会导致ElPlusFormUpImg(图片上传组件)不可用!')
    } else {
      app.config.globalProperties.uploadImgAction = options.uploadImgAction
    }
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
}
export default ElPlusFormUI
`
const template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine)
})

const OUTPUT_PATH = path.join(__dirname, '../lib/index.ts')
fs.writeFileSync(OUTPUT_PATH, template)
console.log('[build entry] DONE:', OUTPUT_PATH, endOfLine)
