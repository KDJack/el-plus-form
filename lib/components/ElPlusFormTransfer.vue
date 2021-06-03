<template>
  <el-transfer
    :class="desc.class"
    :data="desc.options"
    :style="desc.style"
    class="ele-form-transfer"
    v-bind="attrs"
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
  </el-transfer>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, inject } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormTransfer',
  typeName: 'transfer',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx, inject))) }
  }
})
</script>

<style>
.ele-form-transfer {
  line-height: 1;
}
</style>
