/**
 * 这里加载当前文件夹下的所有Vue组件
 */
const modulesFiles = require.context('./', true, /\.vue$/)
const components: any[] = []
const typeList: String[] = []

// 递归
modulesFiles.keys().forEach((file) => {
  const tempComponent = modulesFiles(file).default || modulesFiles(file)
  components.push(tempComponent)
  if (tempComponent.typeName) {
    typeList.push(tempComponent.typeName)
  }
})
export { components, typeList }
