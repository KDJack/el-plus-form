<template>
  <el-checkbox
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="currentValue"
    v-on="onEvents"
  >
    {{ desc.title }}
    <template
      v-if="slots && slots.default"
      #default
    >
      <slot :render="slots.default" />
    </template>
  </el-checkbox>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormYesno',
  typeName: 'yesno',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx))) }
  }
})
</script>
