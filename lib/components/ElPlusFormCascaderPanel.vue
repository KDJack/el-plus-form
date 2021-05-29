<template>
  <el-cascader-panel
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    ref="cascader"
    v-model="currentValue"
    v-on="onEvents"
  >
    <!-- 非作用域插槽 -->
    <template
      v-for="(item, key, index) in slots"
      #[key]="data"
      :key="index"
    >
      <slot
        :name="key"
        :data="data"
      />
    </template>
  </el-cascader-panel>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormCascaderPanel',
  typeName: 'cascader-panel',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    const customAttrs = {
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      fetchSuggestions(s: any, cb: Function) {
        const res: any[] = []
        cb(res)
      }
    }
    return { ...toRefs(reactive(commMixin(props, ctx, customAttrs))) }
  }
})
</script>
