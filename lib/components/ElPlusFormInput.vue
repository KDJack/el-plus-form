<template>
  <el-input
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    :clearable="attrs.clearable || true"
    v-on="onEvents"
    v-model="currentValue"
    @clear="clear"
  >
    <template
      v-for="(item, key, index) of slots"
      #[key]
      :key="index"
    >
      <slot :name="key" />
    </template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, inject } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormInput',
  typeName: 'input',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx, inject))) }
  }
})
</script>
