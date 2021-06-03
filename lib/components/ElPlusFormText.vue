<template>
  <div
    class="ele-form-text"
    :class="desc.class"
    :style="desc.style"
    v-bind="$attrs"
    v-on="desc.on || {}"
  >
    <template v-if="desc.slots && desc.slots.default">
      <slot :render="desc.slots.default" />
    </template>
    {{ $attrs.formatedValue || currentValue }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, reactive } from 'vue'
import { handelValueData } from '../tools/utils'

export default defineComponent({
  name: 'ElPlusFormText',
  typeName: 'text',
  inheritAttrs: false,
  props: {
    value: {},
    field: { type: String, require: true, default: '' },
    desc: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formData: { type: Object, default: null }
  },
  setup(props) {
    const state = reactive({
      currentValue: computed(() => {
        return handelValueData(props.desc.type, props.value, props.desc.default)
      })
    })
    return { ...toRefs(state) }
  }
})
</script>
<style lang="scss" scoped>
.ele-form-text {
  color: #4d4d4d;
}
</style>
