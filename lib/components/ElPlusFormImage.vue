<template>
  <div class="ele-form-image">
    <el-image
      v-for="image of currentValue"
      :class="desc.class"
      :key="image"
      :preview-src-list="attrs.isShowPreview === false ? null : previewList(image)"
      :src="image"
      :style="styles"
      v-bind="attrs"
      v-on="onEvents"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormImage',
  typeName: 'image',
  inheritAttrs: false,
  mixins: [vueMixin],
  setup(props, ctx) {
    const state = reactive({
      ...commMixin(props, ctx),
      previewList: (image: any) => {
        if (Array.isArray(state.currentValue)) {
          const list = state.currentValue.filter((item: any) => item !== image)
          list.unshift(image)
          return list
        } else {
          return []
        }
      },
      styles: computed(() => {
        return Object.assign({}, { width: '80px', height: '80px' }, (props as any).desc.style)
      })
    })
    return { ...toRefs(state) }
  }
})
</script>

<style>
.ele-form-image {
  line-height: 1em;
}

.ele-form-image .el-image {
  border-radius: 5px;
}
</style>
