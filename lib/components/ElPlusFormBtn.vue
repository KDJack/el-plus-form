<template>
  <template v-if="desc.confirm">
    <el-popconfirm
      @confirm="onEvents.click"
      :title="desc.confirm"
    >
      <template #reference>
        <el-button
          :class="desc.class || ''"
          :style="desc.style || {}"
          :size="desc.size || 'mini'"
          v-bind="attrs"
        >
          {{ desc.text || desc.title || currentValue }}
        </el-button>
      </template>
    </el-popconfirm>
  </template>
  <el-button
    v-else
    :class="desc.class || ''"
    :style="desc.style || {}"
    :size="desc.size || 'mini'"
    v-bind="attrs"
    v-on="onEvents"
  >
    {{ desc.text || desc.title || currentValue }}
  </el-button>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from 'vue'

export default defineComponent({
  name: 'ElPlusFormBtn',
  typeName: 'btn',
  inheritAttrs: false,
  props: {
    desc: { type: Object, default: null },
    formData: { type: Object, default: null }
  },
  setup(props, ctx) {
    const state = reactive({
      attrs: computed(() => {
        return Object.assign({}, ctx.attrs, props.desc, props.desc?._attrs)
      }),
      onEvents: computed(() => {
        const events = {}
        if (props.desc && props.desc.on) {
          for (const key in props.desc.on) {
            events[key] = function () {
              props.desc.on[key](props.formData)
            }
          }
        }
        return events
      })
    })
    return { ...toRefs(state) }
  }
})
</script>
