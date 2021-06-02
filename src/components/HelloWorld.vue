<template>
  <el-plus-form
    v-bind="formConfig"
    :formData="formData"
  >
  </el-plus-form>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      formData: {},
      formConfig: {
        formDesc: {
          categoryNo: { type: 'input', label: '编号', require: true },
          displayName: { type: 'input', label: '名称', require: true },
          enabled: { type: 'switch', label: '启用状态', rules: 'select', default: 1 },
          iconName: { type: 'input', label: '图标' },
          imgUrl: { type: 'upimg', label: '图片', limit: 3 },
          introductionRatio: { type: 'nbInput', label: '引进比率' },
          operatingRatio: { type: 'nbInput', label: '运营比率' },
          preferentialRatio: { type: 'nbInput', label: '优惠比率' },
          salesRatio: { type: 'nbInput', label: '销售比率' },
          serviceRatio: { type: 'nbInput', label: '服务比率' },
          showOrder: { type: 'nbInput', label: '显示顺序' }
        },
        // order: ['displayName', 'categoryNo'],
        order: ['displayName', 'introductionRatio', 'categoryNo', 'operatingRatio', 'enabled', 'preferentialRatio', 'iconName', 'salesRatio', 'imgUrl', 'serviceRatio', 'showOrder'],
        column: 2
      }
    })
    return { ...toRefs(state) }
  }
})
</script>
