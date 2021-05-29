<template>
  <el-date-picker
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="currentValue"
    v-on="onEvents"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormYear',
  typeName: 'year',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return {
      ...toRefs(reactive(commMixin(props, ctx, { type: 'year' })))
    }
  }
})
</script>
