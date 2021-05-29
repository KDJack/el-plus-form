/**
 * 通用混入类
 */
// 为了不每个页面都写一次这几个属性，所以就用mixin吧，虽然犹大不建议用。。
export default {
  props: {
    value: {},
    field: { type: String, require: true, default: '' },
    desc: { type: Object, default: null },
    formData: { type: Object, default: null }
  }
}
