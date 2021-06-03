<template>
  <el-select
    :class="desc.class"
    :style="desc.style"
    allow-create
    default-first-option
    filterable
    multiple
    v-bind="attrs"
    v-model="currentValue"
    v-on="onEvents"
  >
    <el-option
      v-for="tag in desc.options"
      :key="tag.value"
      :label="tag.value"
      :value="tag.value"
    />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, inject } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormTag',
  typeName: 'tag',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx, inject))) }
  }
})
</script>
