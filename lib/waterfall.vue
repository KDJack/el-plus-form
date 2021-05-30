<template>
  <div class="waterfall-panel">
    <div
      class="waterfall-column"
      v-for="(columnData, i) in localColumns"
      :key="i"
      :style="{width: 100 / column + '%'}"
    >
      <slot :data="columnData" />
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, computed, watch, onMounted } from 'vue'
import { isArray } from '@/common/utils'

export default defineComponent({
  props: {
    // 默认4列
    column: { type: Number, default: 4 },
    columnKey: { type: String, default: 'children' },
    dataList: { type: Object, default: null, required: true }
  },
  setup(props) {
    const state = reactive({
      counts: [],
      localColumns: [],
      getColums: computed(() => {
        if (props.dataList && props.dataList.length > 0 && props.dataList.length <= props.column) {
          return props.dataList.length
        }
        return props.column
      }),
      init() {
        if (props.dataList) {
          // 前n项直接填进去
          for (let i = 0; i < props.dataList.length; i++) {
            if (i < state.getColums) {
              state.localColumns[i] = [props.dataList[i]]
              state.counts[i] = getItemCount(props.dataList[i])
            } else {
              let index = 0
              // 大于的话，就要选择性的添加了，先找出节点最少的下表位
              for (let i = 1; i < state.counts.length; i++) {
                if (state.counts[i] < state.counts[index]) {
                  index = i
                }
              }
              // 插入记录，并更新count
              state.localColumns[index].push(props.dataList[i])
              state.counts[index] += getItemCount(props.dataList[i])
            }
          }
        }
      }
    })
    watch(
      () => props.column,
      () => {
        state.init()
      }
    )
    onMounted(() => {
      state.init()
    })

    // 获取count
    const getItemCount = (item) => {
      if (item[props.columnKey]) {
        if (isArray(item[props.columnKey])) {
          return item[props.columnKey].length
        } else {
          return item[props.columnKey] * 1
        }
      }
      return 1
    }

    return { ...toRefs(state) }
  }
})
</script>
<style scoped>
.waterfall-panel {
  width: 100%;
  display: flex;
}
</style>
