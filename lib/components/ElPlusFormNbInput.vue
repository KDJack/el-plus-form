<template>
  <el-input
    :class="desc.class"
    :style="desc.style"
    type="number"
    v-bind="attrs"
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
import { defineComponent, toRefs, reactive } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormNbInput',
  typeName: 'nbInput',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx))) }
  }
})
</script>
