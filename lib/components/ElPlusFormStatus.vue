<template>
  <div class="ele-form-status">
    <i
      v-if="currentValue === 0"
      class="status-danger"
    />
    <i
      v-else-if="currentValue === 1"
      class="status-success"
    />
    <i
      v-else-if="currentValue === 2"
      class="status-warning"
    />
    <i
      v-else-if="currentValue === 3"
      class="status-info"
    />
    <div
      :class="desc.class"
      :style="desc.style"
      v-bind="attrs"
      v-on="onEvents"
    >
      {{ attrs.formatedValue || currentValue }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'

export default defineComponent({
  name: 'ElPlusFormStatus',
  typeName: 'status',
  mixins: [vueMixin],
  setup(props, ctx) {
    return { ...toRefs(reactive(commMixin(props, ctx))) }
  }
})
</script>
<style lang="scss" scoped>
.ele-form-status {
  display: flex;
  line-height: 25px;
  align-items: center;
  i {
    display: inline-block;
    min-width: 10px;
    min-height: 10px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .status-danger {
    background: #f56c6c;
  }
  .status-success {
    background: #67c23a;
  }
  .status-warning {
    background: #e6a23c;
  }
  .status-info {
    background: #909399;
  }
}
</style>
