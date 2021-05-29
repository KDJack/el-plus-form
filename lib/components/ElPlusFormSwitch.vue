<template>
  <el-switch
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    :active-value="1"
    :inactive-value="0"
    v-model="currentValue"
    @clear="clear"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormSwitch',
  typeName: 'switch',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx))) }
  }
})
</script>
