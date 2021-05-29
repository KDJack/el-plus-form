<template>
  <div
    class="el-plus-form-btn-group"
    :style="{'justify-content': getAlignItems}"
  >
    <template
      v-for="(item, i) in localBtnList"
      :key="i"
    >
      <ElPlusFormBtn
        type="info"
        :desc="item"
        :formData="formData"
        :plain="true"
      />
    </template>
    <template v-if="limitList && limitList.length > 0">
      <el-dropdown
        class="group-menu-btn"
        :size="desc.size || 'small'"
      >
        <el-button
          type="info"
          :size="desc.size || 'mini'"
          :plain="true"
        >
          更多<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, i) in limitList"
              :key="i"
            >
              {{ item.text || item.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import commMixin from '../mixins/commMixin'
import ElPlusFormBtn from './ElPlusFormBtn.vue'

export default defineComponent({
  name: 'ElPlusFormBtns',
  typeName: 'btns',
  components: { ElPlusFormBtn },
  props: {
    desc: { type: Object, default: null },
    formData: { type: Object, default: null }
  },
  setup(props, ctx) {
    const refs = reactive(commMixin(props, ctx))
    const state = reactive({
      localBtnList: [] as any[],
      limitList: [] as any[],
      getAlignItems: computed(() => {
        switch (props.desc.align) {
          case 'right':
            return 'flex-end'
          case 'center':
            return 'center'
          case undefined:
          case 'left':
            return 'flex-start'
          default:
            return 'flex-start'
        }
      })
    })
    // 初始化
    const initBtnList = () => {
      const tempList = [] as any[]
      if (props.desc.btns.length > 0) {
        props.desc.btns.map((item: any) => {
          if (handelItemVIf(item)) {
            tempList.push(item)
          }
        })
      }
      state.localBtnList = tempList
      const limit = props.desc.limit || 3
      if (state.localBtnList.length > limit) {
        state.limitList = state.localBtnList.splice(limit - 1)
      }
    }
    // 执行一次vif的处理
    const handelItemVIf = (formItem: any): Boolean => {
      if (typeof formItem.vif === 'function') {
        return Boolean(runFnGetData(formItem.vif))
      } else if (typeof formItem.vif === 'boolean') {
        return formItem.vif
      }
      return true
    }
    // 执行函数,获取相关数据
    const runFnGetData = (fn: Function) => {
      return fn(props.formData)
    }
    onMounted(() => {
      initBtnList()
    })
    return { ...toRefs(refs), ...toRefs(state) }
  }
})
</script>
<style lang="scss">
.el-plus-form-btn-group {
  display: flex;
  .group-menu-btn {
    margin-left: 10px;
  }
}
</style>
