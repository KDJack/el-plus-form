<template>
  <div
    class="ele-form-text"
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="onEvents"
  >
    <template v-if="slots && slots.default">
      <slot :render="slots.default" />
    </template>
    {{ attrs.formatedValue || currentValue }}
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormText',
  typeName: 'text',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx))) }
  }
})
</script>
<style lang="scss" scoped>
.ele-form-text {
  color: #4d4d4d;
}
</style>
