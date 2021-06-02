<template>
  <div
    class="el-plus-form"
    :class="{'el-plus-form--inline': inline}"
    ref="wrapper"
  >
    <el-form
      :model="localFormData"
      @submit.prevent="handleSubmitForm"
      ref="refElForm"
      v-bind="computedFormAttrs"
    >
      <!-- 默认插槽作为表单项 -->
      <slot />
      <waterfall
        :dataList="orderedFormDesc"
        :column="column"
        columnKey="height"
      >
        <template #default="columnData">
          <div class="el-plus-form-column-panel">
            <template
              v-for="(formItem, index) in columnData.data"
              :key="index"
            >
              <el-form-item
                v-if="formItem._vif"
                :error="formErrorObj ? formErrorObj[formItem.field] : null"
                :label="isShowLabel && formItem.isShowLabel !== false ? formItem._label : null"
                :label-width="formItem.labelWidth || null"
                :prop="formItem.field"
              >
                <component
                  style="min-width: 80px"
                  :formData="localFormData"
                  :is="formItem._type"
                  :disabled="formItem._disabled || false"
                  :readonly="readonly || false"
                  v-bind="formItem.attrs"
                  :desc="formItem"
                  :options="formItem._options"
                  :ref="setComponentRef"
                  :field="formItem.field"
                  :size="formItem.size || size"
                  :value="localFormData[formItem.field]"
                />
                <div
                  class="el-plus-form-tip"
                  v-if="formItem._tip"
                  v-html="formItem._tip"
                />
              </el-form-item>
            </template>
          </div>
        </template>
      </waterfall>

      <slot name="form-footer" />
      <el-form-item
        :label-width="inline ? '10px' : null"
        style="margin-bottom: 0 !important"
      >
        <slot
          :data="localFormData"
          name="form-btn"
        >
          <template
            v-for="(btn, index) of btns"
            :key="index"
          >
            <el-button
              @click="btn.click"
              v-bind="btn.attrs"
            >
              <template
                v-if="btn.text"
                #default
              >
                {{ btn.text }}
              </template>
            </el-button>
          </template>
        </slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, nextTick, onMounted, provide, toRefs } from 'vue'
import waterfall from './waterfall.vue'
import { is, castArray } from './tools/utils'
import { cloneDeep } from 'lodash'
import * as validates from './tools/validate'
import { throttle } from 'throttle-debounce'
import { typeList } from './components/index'

export default defineComponent({
  name: 'ElPlusForm',
  emits: ['input', 'before-validate', 'before-request', 'request-success', 'request-error', 'request-end', 'request', 'back', 'close', 'cancel', 'update:visible', 'reset'],
  components: { waterfall },
  props: {
    // 表单描述
    formDesc: { type: Object, required: true },
    // 表单数据
    formData: { type: Object, required: true },
    // 行内模式
    inline: { type: Boolean, default: false },
    // 表单自身属性
    formAttrs: { type: Object, default: null },
    // 校检规则
    rules: { type: Object, default: null },
    // 提交状态
    isLoading: { type: Boolean, default: false },
    // 表单错误信息
    formError: { type: Object, default: null },
    // 提交函数
    requestFn: { type: Function, default: null },
    // 自定义表单按钮
    formBtns: { type: Array, default: null },
    // 是否显示submit按钮
    isShowSubmitBtn: { type: Boolean, default: true },
    // 是否显示 cancel 取消按钮
    // 默认值: isDialog = true 时, 默认值为 true, 具体查看: computedIsShowCancelBtn
    isShowCancelBtn: { type: Boolean, default: false },
    // 是否显示back按钮
    // 默认值: 当 inline = true OR isDialog = true, 默认值为 false; 其它情况true. 具体请看计算属性: computedIsShowBackBtn
    isShowBackBtn: { type: Boolean, default: false },
    // 是否显示reset按钮
    isShowResetBtn: { type: Boolean, default: true },
    // 提交按钮文本
    // 默认值: 当 inline 为true时, 值为 '查询'; inline 为 false 时,  值为 '提交'. 具体请看计算属性: computedSubmitBtnText
    submitBtnText: { type: String, default: null },
    // 返回按钮
    backBtnText: { type: String, default: '' },
    // 重置按钮
    resetBtnText: { type: String, default: '' },
    // 取消按钮
    cancelBtnText: { type: String, default: '' },
    // 是否显示标签
    isShowLabel: { type: Boolean, default: true },
    // 标签宽度
    labelWidth: { type: [Number, String], default: 'auto' },
    // 全局禁用表单
    disabled: { type: Boolean, default: false },
    // 全局的readonly
    readonly: { type: Boolean, default: false },
    // 是否为弹窗
    isDialog: { type: Boolean, default: false },
    // 弹窗变量控制
    visible: { type: Boolean, default: false },
    // options 的请求方法
    optionsFn: { type: Function, default: null },
    // 表单项顺序数组
    // 数组项为formDesc中的key
    order: { type: Array, default: () => [] },
    // 表单全局size
    size: { type: String, default: 'small' },
    // 是否显示错误后的 notify
    isShowErrorNotify: { type: Boolean, default: true },
    // 其他钩子 直接放到attrs里面去了
    // 表单列 默认1
    column: { type: Number, default: 1 }
    // 比如 beforeValidate, beforeRequest, requestSuccess, requestError, requestEnd
  },
  setup(props: any, context) {
    // 定义
    const refElForm = ref(null) as any
    let formDescData = reactive(cloneDeep(props.formDesc))
    const innerIsLoading = ref(false)
    let innerFormError = reactive({})
    // const checkLinkageFn: any = null
    const fieldRefs_ = ref([] as Array<any>)
    let oldFormData = cloneDeep(props.formData)
    // 定义return state
    const state: any = reactive({
      localFormData: cloneDeep(props.formData),
      btns: computed(() => {
        let btns_ = []
        // 重置按钮
        if (props.isShowResetBtn) {
          btns_.push({
            attrs: { size: props.size } as any,
            text: props.resetBtnText || '重置',
            click: () => {
              context.emit('reset')
              // 调用内部方法进行值的重置
              fieldRefs_.value.forEach((field: any) => {
                field.reset?.(oldFormData[field.field])
              })
              nextTick(() => {
                // 表单校验重置
                refElForm.value.clearValidate()
              })
            }
          })
        }
        // 返回按钮
        if (computedIsShowBackBtn.value) {
          btns_.push({
            attrs: { size: props.size } as any,
            text: props.backBtnText || '返回',
            click: () => {
              // 浏览器history API
              history.back()
            }
          })
        }

        // 取消按钮
        if (computedIsShowCancelBtn.value) {
          btns_.push({
            attrs: { size: props.size } as any,
            text: props.cancelBtnText || '取消',
            click: () => {
              context.emit('close')
              context.emit('cancel')
              context.emit('update:visible', false)
            }
          })
        }
        // 提交按钮
        if (props.isShowSubmitBtn) {
          btns_.push({
            attrs: {
              type: 'primary',
              size: props.size,
              loading: props.isLoading || innerIsLoading.value
            } as any,
            text: computedSubmitBtnText.value,
            click() {
              // console.log('btn-localFormData: ', state.localFormData)
              state.handleSubmitForm()
            }
          })
        }
        // 自定义按钮
        if (props.formBtns) {
          const customBtns = props.formBtns.map((btn: any) => ({
            attrs: { ...btn, size: btn.size || props.size },
            text: btn.text,
            click: btn.click
          }))
          btns_ = [...btns_, ...customBtns]
        }
        return btns_
      }),
      // 合并校验规则
      computedRules: computed(() => {
        // 首先拿到表单总体传入的rules
        const tempRules = props.rules || []
        // 遍历属性描述对象，看看里面有没有校验规则
        formDescKeys.value.map((field: any) => {
          if (!tempRules[field]) tempRules[field] = []
          if (formDescData[field].rules) {
            if (typeof formDescData[field].rules === 'string') {
              // string的话，就行默认校验规则中取
              tempRules[field].push(...(validates as any)[formDescData[field].rules])
              //  if (field === 'key_1619423491073')
            } else {
              // 查看总体规则中是否已经含有了该属性的校验
              // TODO ？ 这里就合并两个校验规则吧，反正是数组
              castArray(formDescData[field].rules).map((item: any) => {
                tempRules[field].push(item)
              })
            }
          } else if (formDescData[field].required || formDescData[field].require) {
            // 如果直接指定 required || require，手动添加校验信息
            tempRules[field].push({
              required: true,
              message: formDescData[field].label + '必填'
            })
          }
        })
        return tempRules
      }),
      // 定义form的绑定属性
      computedFormAttrs: computed(() => {
        return {
          ...props.formAttrs,
          labelWidth: props.labelWidth === 'auto' ? 'auto' : parseInt(props.labelWidth) + 'px',
          validateOnRuleChange: false,
          disabled: props.disabled,
          rules: state.computedRules
        }
      }),
      // 通过order数组排序后的formDesc
      orderedFormDesc: computed(() => {
        const tempData = [] as any[]
        if (props.order && props.order.length > 0) {
          // 根据order遍历，先添加到orderedFormDesc的key在之后遍历的时候，会先遍历，从而实现排序的目的。
          props.order.forEach((field: any) => {
            if (formDescData[field]) {
              tempData.push(setFieldHeight(formDescData[field], field))
            } else {
              // throw new Error(field + ': order中定义的key在formDesc中不存在')
              // console.log(field + ': order中定义的key在formDesc中不存在')
            }
          })
          // 如果key不在order数组的时候，按照原序添加到orderedFormDesc
          // Object.keys(formDescData).forEach((field) => {
          //   // 当key不在order数组的时候
          //   if (!tempData[field]) {
          //     tempData[field] = formDescData[field]
          //   }
          // })
        } else {
          for (const key of formDescData) {
            tempData.push(setFieldHeight(formDescData[key], key))
          }
        }
        return tempData
      }),
      // 提交表单
      handleSubmitForm: async () => {
        const tempAttr = context.attrs as any
        try {
          // 通知外部校验表单事件
          context.emit('before-validate', state.localFormData)
          // 自定义处理
          if (tempAttr.beforeValidate) {
            const isPass = await tempAttr.beforeValidate(state.localFormData)
            if (isPass === false) return
          }
          await validate()

          // 为了不影响原值, 这里进行 clone
          let data = cloneDeep(state.localFormData)
          // valueFormatter的处理
          for (const field in data) {
            const formItem = formDescData[field]
            if (formItem && formItem.valueFormatter) {
              data[field] = formItem.valueFormatter(data[field], data)
            }
          }
          // 提交数据前的通知
          context.emit('before-request', data)
          if (tempAttr.beforeRequest) {
            const beforeRequestData = tempAttr.beforeRequest(data)
            if (beforeRequestData === false) return
            if (typeof beforeRequestData === 'object') {
              data = beforeRequestData
            }
          }
          if (props.requestFn) {
            // 在内部调用请求
            if (innerIsLoading.value) return
            innerIsLoading.value = true
            try {
              const response = await props.requestFn(data)
              nextTick(() => {
                context.emit('request-success', response)
                if (tempAttr.requestSuccess) {
                  tempAttr.requestSuccess(response)
                }
              })
            } catch (error) {
              // 如果用户有处理异常的方法了
              if (tempAttr.requestError) {
                tempAttr.requestError(error)
              } else {
                // 处理异常情况
                if (error instanceof Error) {
                  // 返回的是Error类型, 则进行解析
                  try {
                    const msg = JSON.parse(error.message)
                    if (msg instanceof Object) {
                      innerFormError = msg
                    }
                    // eslint-disable-next-line
                  } catch {}
                } else if (error instanceof Object) {
                  // 返回的是对象类型, 则直接设置
                  innerFormError = error
                }
                context.emit('request-error', error)
              }
            } finally {
              innerIsLoading.value = false
              if (tempAttr.requestEnd) {
                tempAttr.requestEnd()
              }
              context.emit('request-end')
            }
          } else {
            // 在外部用户自己处理请求
            if (props.isLoading) return
            context.emit('request', data)
          }
        } catch (error) {
          // return processError(error)
        }
      },
      // 设置子组件的ref-重置form的时候需要用到
      setComponentRef: (el: any) => {
        if (!el) return
        if (fieldRefs_.value.filter((item: any) => item.field === el.field).length <= 0) {
          fieldRefs_.value.push(el)
        }
      },
      // 表单错误信息
      formErrorObj: computed(() => {
        return Object.assign({}, innerFormError, props.formError)
      })
    })

    // 整体初始化属性
    const initFormAttrs = throttle(500, () => {
      Object.keys(formDescData).forEach((field) => {
        const formItem = formDescData[field]
        // 1.设置 _type
        formItem._type = typeList.includes(formItem.type) ? 'el-plus-form-' + formItem.type : formItem.type
        // 2.触发 v-if 显示 / 隐藏 设置_vif
        formItem._vif = handelItemVIf(formItem, field)
        // 3.触发 disabled 禁用 / 启用 设置_disabled
        formItem._disabled = handelItemDisabled(formItem, field)
        // 4.动态属性 _attrs
        formItem._attrs = getDynamicAttr(formItem.attrs, field)
        // 5.动态 label
        formItem._label = getDynamicAttr(formItem.label, field)
        // 6.动态 prop
        formItem._prop = getDynamicAttr(formItem.prop, field)
        // 7.动态 optionsLinkageFields
        formItem._optionsLinkageFields = castArray(getDynamicAttr(formItem.optionsLinkageFields, field))

        // 这里初始化一下默认值
        if (formItem.default !== undefined && formItem.default !== null) {
          if (state.localFormData[field] === undefined) {
            state.localFormData[field] = formItem.default
          }
        }
      })
    })
    // 执行一次vif的处理
    const handelItemVIf = (formItem: any, field: string): Boolean => {
      if (typeof formItem.vif === 'function') {
        return Boolean(runFnGetData(formItem.vif, field))
      } else if (typeof formItem.vif === 'boolean') {
        return formItem.vif
      }
      return true
    }
    // 处理disabled属性
    const handelItemDisabled = (formItem: any, field: string): Boolean => {
      if (typeof formItem.disabled === 'function') {
        return Boolean(runFnGetData(formItem.disabled, field))
      } else if (typeof formItem.disabled === 'boolean') {
        return formItem.disabled
      }
      return false
    }
    // 获取动态属性
    const getDynamicAttr = (attr: any, field: string) => {
      return typeof attr === 'function' ? runFnGetData(attr, field) : attr
    }
    // 执行函数,获取相关数据
    const runFnGetData = (fn: Function, field: string) => {
      return fn(state.localFormData, formDescData[field], formDescData)
    }
    // 设置表单元素的高度，瀑布流需要使用
    const setFieldHeight = (fieldItem: any, field: any) => {
      switch (fieldItem.type) {
        case 'upimg':
          fieldItem.height = 206
          break
        default:
          fieldItem.height = 58
          break
      }
      fieldItem.field = field
      return fieldItem
    }

    // 改变值
    const changeValue = (field: any, val: any): void => {
      state.localFormData[field] = val
      initFormAttrs()
    }
    // formDesc的key
    const formDescKeys = computed(() => {
      return Object.keys(formDescData)
    })

    // 提交按钮默认值(inline和layout模式下不同)
    const computedSubmitBtnText = computed(() => {
      if (is(props.submitBtnText, 'String')) {
        return props.submitBtnText
      } else {
        return props.inline ? '查询' : '提交'
      }
    })

    const computedIsShowCancelBtn = computed(() => {
      if (is(props.isShowCancelBtn, 'Boolean')) {
        // 如果指定了, 则使用指定的值
        return props.isShowCancelBtn || props.isDialog
      } else {
        // 如果未指定, 根据 isDialog
        return props.isDialog
      }
    })
    // 是否显示返回按钮(inline和layout模式下不同)
    const computedIsShowBackBtn = computed(() => {
      if (is(props.isShowBackBtn, 'Boolean')) {
        return props.isShowBackBtn
      } else {
        return !(props.inline || props.isDialog)
      }
    })

    // 监听watch
    watch(
      () => props.formData,
      () => {
        oldFormData = cloneDeep(props.formData)
        state.localFormData = reactive(cloneDeep(props.formData))
        // 执行一次初始化
        // initFormAttrs()
        // 表单校验重置
        nextTick(() => {
          refElForm.value.clearValidate()
        })
      }
    )
    watch(
      () => props.disabled,
      (value) => {
        if (value) {
          refElForm.value.clearValidate()
        }
      }
    )
    // 同步数据
    watch(
      () => props.formDesc,
      (formDesc) => {
        const oldFormDescData = {} as any
        // 去除被删除字段
        Object.keys(formDescData)
          .filter((key) => formDesc[key])
          .forEach((key) => {
            oldFormDescData[key] = formDescData[key]
          })
        formDescData = Object.assign({}, oldFormDescData, cloneDeep(formDesc))
      }
    )
    watch(
      () => formDescData,
      (desc) => {
        if (desc) {
          Object.keys(desc).forEach((field) => {
            // 设置默认值
            // 转换 tip, 内部属性不显示
            if (desc[field].tip) {
              desc[field]._tip = String(desc[field].tip).replace(/`(.+?)`/g, '<code>$1</code>')
            }
          })
          // 检查联动
          initFormAttrs()
        }
        nextTick(() => {
          refElForm.value.clearValidate()
        })
      }
    )
    watch(
      () => props.visible,
      () => {
        if (!props.visible) {
          // 表单校验重置
          refElForm.value.clearValidate()
        }
      }
    )

    // 验证表单
    const validateForm = () => {
      return new Promise((resolve: any, reject: any) => {
        if (state.computedRules) {
          // 当传递了验证规则
          refElForm.value.validate((valid: Boolean, invalidFields: any) => {
            if (valid) {
              // 验证通过
              resolve()
            } else {
              // 显示错误
              reject(invalidFields)
            }
          })
        } else {
          resolve()
        }
      })
    }

    // 验证表单
    const validate = async () => {
      await validateForm()
      // await validateComponent()
    }

    onMounted(() => {
      // 执行一次初始化
      initFormAttrs()
    })

    // 注入子组件所需的数据
    provide('changeValueFn', changeValue)

    return { refElForm, ...toRefs(state) }
  }
})
</script>

<style>
.el-plus-form--inline .el-plus-form-btns {
  width: auto;
}
.el-plus-form-col--break {
  clear: both;
}
.el-plus-form-tip {
  color: #909399;
  line-height: 1.5em;
  margin-top: 3px;
}
.el-plus-form-tip code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}
</style>
<style scoped>
.el-plus-form .el-plus-form-column-panel {
  padding: 0 20px;
}
</style>
