<template>
  <el-input
    :class="desc.class"
    :show-password="true"
    :style="desc.style"
    v-bind="attrs"
    v-model="currentValue"
    v-on="onEvents"
  >
    <!-- 组件内部插槽 -->
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
  </el-input>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, inject } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormPassword',
  typeName: 'password',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx, inject))) }
  }
})
</script>
