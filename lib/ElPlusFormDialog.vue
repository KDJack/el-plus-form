<template>
  <div
    class="el-plus-form-dialog"
    v-elDraggableDialog
  >
    <el-dialog
      :title="title"
      v-model="isShowDialog"
      :width="width"
      :top="top"
      :close-on-click-modal="false"
    >
      <!-- title 插槽 -->
      <template #title>
        <slot
          :title="title"
          name="title"
        />
      </template>
      <div style="padding: 10px 40px 0 40px;">
        <ElPlusForm
          :formData="formData"
          :formDesc="formDesc"
          :isShowBackBtn="isShowBackBtn"
          :isShowCancelBtn="isShowCancelBtn"
          v-bind="$attrs"
          ref="elPlusForm"
          v-model:visible="isShowDialog"
        />
      </div>
      <!-- footer插槽 -->
      <template #footer>
        <slot name="footer" />
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import ElPlusForm from './ElPlusForm.vue'
import { defineComponent, toRefs, reactive, ref, nextTick, watch } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  name: 'ElPlusFormDialog',
  components: { ElPlusForm },
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Boolean, default: false },
    // 表单数据
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 表单项
    formDesc: { type: Object, required: true },
    // 弹框标题
    title: { type: String, default: '' },
    // 弹窗标题
    width: { type: String, default: '60%' },
    // top属性
    top: { type: String, default: '10vh' },
    // 弹窗其它属性
    dialogAttrs: { type: Object, default: null },
    // 是否显示返回按钮, 这里是 false
    isShowBackBtn: { type: Boolean, default: false },
    // 是否显示取消按钮, 这里是 true
    isShowCancelBtn: { type: Boolean, default: true }
  },
  setup(props, { emit }) {
    const elPlusForm = ref(null)
    const state = reactive({
      isShowDialog: false,
      show() {
        nextTick(() => {
          state.isShowDialog = true
        })
      }
    })

    watch(
      () => props.modelValue,
      () => {
        state.isShowDialog = props.modelValue
      }
    )
    watch(
      () => state.isShowDialog,
      () => {
        emit('update:modelValue', state.isShowDialog)
      }
    )
    return { elPlusForm, ...toRefs(state) }
  }
})
</script>

<style>
.el-plus-form-dialog {
  position: absolute;
  z-index: 10000;
}
.el-plus-form-dialog .el-dialog__body {
  padding: 10px 20px;
}
.el-plus-form-dialog .el-plus-form-btns {
  float: right;
  margin-top: 10px;
}
</style>
