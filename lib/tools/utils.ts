// 是否定义
export function isDef(val: any) {
  return !isUnDef(val)
}

// 是否没定义
export function isUnDef(val: any) {
  return val === null || val === undefined
}

// 判断是否为函数
export function isFunction(val: any) {
  return typeof val === 'function'
}

// 判断类型
export function is(val: any, type: any) {
  const typeArr = Array.isArray(type) ? type : [type]
  const valType = Object.prototype.toString.call(val)
  return typeArr.some((type) => `[object ${type}]` === valType)
}

// 判断是否为生产环境
export function isProd() {
  return process.env.NODE_ENV === 'production'
}

// 获取 display: none 的节点宽度和高度
export function getSize(elem: any) {
  const noneNodes: any[] = []
  const nodeStyle: any[] = []

  getNoneNode(elem) // 获取多层display：none;的元素
  setNodeStyle()
  const width = elem.clientWidth
  const height = elem.clientHeight
  resumeNodeStyle()

  return {
    width: width,
    height: height
  }

  function getNoneNode(node: any) {
    const display = getStyles(node).getPropertyValue('display')
    const tagName = node.nodeName.toLowerCase()
    if (display !== 'none' && tagName !== 'body') {
      getNoneNode(node.parentNode)
    } else {
      noneNodes.push(node)
      if (tagName !== 'body') getNoneNode(node.parentNode)
    }
  }

  // 这方法才能获取最终是否有display属性设置，不能style.display。
  function getStyles(elem: any) {
    // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    let view = elem.ownerDocument.defaultView

    if (!view || !view.opener) {
      view = window
    }
    return view.getComputedStyle(elem)
  }

  function setNodeStyle() {
    let i = 0
    for (; i < noneNodes.length; i++) {
      const visibility = noneNodes[i].style.visibility
      const display = noneNodes[i].style.display
      const style = noneNodes[i].getAttribute('style')
      // 覆盖其他display样式
      noneNodes[i].setAttribute('style', 'visibility:hidden;display:block !important;' + style)
      nodeStyle[i] = {
        visibility: visibility,
        display: display
      }
    }
  }

  function resumeNodeStyle() {
    let i = 0
    for (; i < noneNodes.length; i++) {
      noneNodes[i].style.visibility = nodeStyle[i].visibility
      noneNodes[i].style.display = nodeStyle[i].display
    }
  }
}

// 如果 value 不是数组, 那么强制转为数组
// 空转为空数组 undefined | null | '' => []
// 1 => [1], false => [false], {} => [{}]
export function castArray(value: any) {
  if (Array.isArray(value)) {
    return value
  } else if (value === undefined || value === null || value === '') {
    return []
  } else {
    return [value]
  }
}
// 如果 value 不是数组, 那么强制转为数组
export function castFileList(value: any) {
  if (Array.isArray(value)) {
    return value
  } else if (value === undefined || value === null || value === '') {
    return []
  } else {
    return value.split(',')
  }
}
// 如果 value 不是字符串, 那么强制转为字符串
export function castString(value: any) {
  if (typeof value === 'string') {
    return value
  } else if (value === undefined || value === null) {
    return ''
  } else if (value.toString) {
    return value.toString()
  } else {
    return value + ''
  }
}
// 如果 value 不是Boolean, 那么强制转为Boolean
export function castBoolean(value: any) {
  if (typeof value === 'boolean') {
    return value
  } else {
    return Boolean(value)
  }
}
// 如果 value 不是Number, 那么强制转为Number
export function castNumber(value: any) {
  if (typeof value === 'number') {
    return value
  } else {
    return Number(value) || 0
  }
}

// 判断是否为空
// 空数组 / null / undefined / 空字符串
export function isEmpty(val: any) {
  if (Array.isArray(val) && val.length === 0) {
    return true
  } else if (isUnDef(val)) {
    return true
  } else if (typeof val === 'string' && val === '') {
    return true
  } else {
    return false
  }
}

/**
 * 获取随机字符串
 * @returns {string}
 */
export function getUID(): string {
  let str = ''
  const arr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  for (let i = 0; i < 32; i++) {
    let index = Math.floor(arr.length * Math.random())
    if (index < 0) index = 0
    str += arr[index]
  }
  return str
}

// 根据类型获取初始值
export function handelValueData(type: String, value: any, defVal?: any): any {
  let tempValue = null
  if (value !== undefined && value !== null && value !== '') {
    tempValue = value
  } else if (defVal !== undefined && defVal !== null) {
    tempValue = defVal
  }
  if (type) {
    // 输入类
    switch (type) {
      case 'input':
      case 'nbInput':
      case 'password':
        tempValue = castString(tempValue) || ''
        break
      case 'yesno':
        tempValue = castBoolean(tempValue) || false
        break
      case 'cascader':
      case 'checkbox':
      case 'checkbox-button':
      case 'image':
      case 'transfer':
        tempValue = castArray(tempValue) || []
        break
      case 'number':
      case 'status':
      case 'switch':
        tempValue = castNumber(tempValue) || 0
        break
      case 'upImg':
        tempValue = castFileList(tempValue)
        break
    }
  }
  return tempValue
}
