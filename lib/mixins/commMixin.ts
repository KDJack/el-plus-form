import { inject, computed } from 'vue'
import { cloneDeep } from 'lodash'
import { castArray, castString, castBoolean, castNumber, castFileList } from '../tools/utils'

/**
 * 通用的定义
 * @param props
 * @param ctx
 * @returns
 */
export default function (props: any, ctx: any, customAttrs?: Object) {
  const changeValueFn = inject('changeValueFn') as Function

  // 定义组件的双弓绑定
  const currentValue = computed({
    get: () => {
      return handelValueData(props.value)
    },
    set: (val) => {
      changeValueFn(props.field, val)
    }
  })
  // 合并组件的属性 用户自定义属性放最后customAttrs，权限最高
  const attrs = Object.assign({}, ctx.attrs, props.desc?._attrs, getPlaceholder(), customAttrs)
  if (!attrs.disabled) delete attrs.disabled
  if (!attrs.readonly) delete attrs.readonly
  if (!attrs.options) {
    delete attrs.options
  } else {
    if (props.desc.type === 'radio-button') {
      delete attrs.options
    } else {
      attrs.options = cloneDeep(attrs.options)
    }
  }

  // 通用的重置方法
  const reset = (val: any) => {
    changeValueFn(props.field, handelValueData(val))
  }
  // 通用的清空方法 ? 如果组件存本身在改方法的话
  const clear = () => {
    changeValueFn(props.field, handelValueData(null))
  }
  // 插槽
  const slots = computed(() => {
    return props.desc.slots || {}
  })
  // 事件
  const onEvents = computed(() => {
    return Object.assign({}, props.desc.on)
  })

  // 根据类型获取初始值
  function handelValueData(value: any): any {
    let tempValue = null
    if (value !== undefined && value !== null && value !== '') {
      tempValue = value
    } else if (props.desc.default !== undefined && props.desc.default !== null) {
      tempValue = props.desc.default
    }
    if (props.desc && props.desc.type) {
      // 输入类
      switch (props.desc.type) {
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
  // 根据类型获取属性 placeholder
  function getPlaceholder() {
    if (!props.desc || !props.desc.type) return ''
    switch (props.desc.type) {
      case 'input':
      case 'nbInput':
      case 'autocomplete':
      case 'password':
      case 'tag':
        return { placeholder: '请输入' + (props.desc?._label || props.desc?.placeholder) }
      case 'switch':
        return {}
      case 'select':
      case 'cascader':
        return { placeholder: '请选择' + (props.desc?._label || props.desc?.placeholder) }
      case 'data':
      case 'datetime':
      case 'datas':
        return { placeholder: '选择日期' }
      case 'daterange':
      case 'datetimerange':
      case 'timerange':
      case 'monthrange':
        return {
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期'
        }
      case 'dates':
        return { placeholder: '选择一个或多个日期' }
      case 'month':
        return { placeholder: '选择月' }
      case 'time':
      case 'timsPicker':
        return { placeholder: '请选择时间' }
      case 'week':
        return { placeholder: '请选择周' }
      case 'year':
        return { placeholder: '请选择年' }
      case 'upImg':
        return { placeholder: '请上传' }
    }
  }
  return { currentValue, attrs, reset, clear, slots, onEvents }
}
