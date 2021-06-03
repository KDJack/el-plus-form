<template>
  <el-checkbox-group
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="currentValue"
    v-on="onEvents"
  >
    <el-checkbox-button
      v-for="option of desc.options"
      :key="option.value"
      :label="option.value"
      v-bind="option.attrs"
    >
      {{ option.text }}
    </el-checkbox-button>
  </el-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, inject } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormCheckboxButton',
  typeName: 'checkbox-button',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx, inject))) }
  }
})
</script>
