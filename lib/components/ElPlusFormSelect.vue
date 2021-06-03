<template>
  <el-select
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-model="currentValue"
    :loading="loading"
    :remote-method="changeOptions"
    v-on="onEvents"
  >
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
    <el-option
      :key="option.value"
      :label="option.text"
      :value="option.value"
      v-bind="option.attrs"
      v-for="option in options"
    />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, inject } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormSelect',
  typeName: 'select',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    const state = reactive({
      ...commMixin(props, ctx, inject),
      loading: false,
      remoteMethod: computed(() => {
        return ctx.attrs['remote-method'] || ctx.attrs.remoteMethod
      }),
      changeOptions: (q: any) => {
        if (state.remoteMethod) {
          state.loading = true
          ;(state as any).remoteMethod(q, (options: any) => {
            state.loading = false
            console.log('TODO options: ', options)
            // TODO
          })
        }
      }
    })
    return { ...toRefs(state) }
  }
})
</script>
