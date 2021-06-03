<template>
  <div class="ele-form-upload-image">
    <el-upload
      :list-type="listType"
      style="display: flex"
      :accept="accepts.join(',')"
      :limit="getLimit"
      :fileList="fileList"
      :auto-upload="autoUpload"
      :before-upload="handelUploadBefore"
      :on-remove="handelUploadRemove"
      :on-success="handelUploadSuccess"
      :on-exceed="handleOutOfLimit"
      :on-preview="handelPreview"
      :class="[fileList.length >= getLimit ? 'hide-add' : '']"
      v-bind="attrs"
      v-on="onEvents"
      v-model="currentValue"
    >
      <i class="el-icon-plus" />
      <!-- <div class="el-upload__tip">
        {{ tip || getTip }}
      </div> -->
    </el-upload>

    <!-- 图片查看的站位标签 -->
    <el-image
      style="width: 0; height: 0"
      :key="imgDomId"
      :id="imgDomId"
      :src="showImgUrl"
      :preview-src-list="previewList"
      @load="showImage"
    />
    <div
      v-if="!autoUpload"
      class="upload-hands-submit"
    >
      <el-button
        style="margin-left: 10px;"
        size="small"
        :disabled="getUploadState !== -1"
        type="success"
        @click="submit"
      >
        上传到服务器
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, getCurrentInstance, inject } from 'vue'
import commMixin from '../mixins/commMixin'
import vueMixin from '../mixins/vueMixin'
// 引入文件校验
import { getUID } from '../tools/utils'

export default defineComponent({
  name: 'ElPlusFormUpimg',
  typeName: 'upimg',
  inheritAttrs: false,
  mixins: [vueMixin],
  props: {
    filePath: { type: String, default: '' },
    fileName: { type: String, default: 'fileName' },
    maxSize: { type: Number, default: 3 * 1024 * 1024 },
    accepts: { type: Array, default: () => ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'] as Array<string> },
    multiple: { type: Boolean, default: true },
    autoUpload: { type: Boolean, default: true },
    listType: { type: String, default: 'picture-card' },
    name: { type: String, default: 'fileName' },
    tip: { type: String, default: '' }
  },
  setup(props, context) {
    const { ctx } = getCurrentInstance() as any
    const state = reactive({
      ...commMixin(props, context, inject, { action: ctx.uploadImgAction || '', data: { filePath: props.filePath }, name: props.name }),
      fileList: [],
      fileList__: [],
      isStartUpload: false,
      imgDomId: 'img-' + getUID(),
      showImgUrl: '',
      getLimit: computed(() => (props.multiple ? (props as any).desc.limit : 1)),
      previewList: computed(() => {
        const tempList: Array<string> = state.fileList.map((item: any) => item.url as string)
        return tempList
      }),
      // 处理删除
      handelUploadRemove(file: any, fileList: any) {
        state.fileList__ = fileList
        state.callbackChange()
      },
      // 上传成功回调
      handelUploadSuccess(response: any, file: any, fileList: any) {
        state.fileList__ = fileList
        state.callbackChange()
      },
      // 上传之前，校验文件大小以及类型
      handelUploadBefore(file: any) {
        const message = validateFile(file, props.accepts, props.maxSize)
        if (message !== true) {
          ctx.$message.warning(message)
          return false
        }
        state.isStartUpload = true
      },
      // 浏览图片
      handelPreview(file: any) {
        state.imgDomId = 'img-' + getUID()
        state.showImgUrl = file.url
      },
      // 超出上传数量
      handleOutOfLimit() {
        ctx.$message.error('图片/文件数量最多只能上传' + state.getLimit + '！！！')
      },
      showImage() {
        document.getElementById(state.imgDomId)?.click()
      },
      callbackChange() {
        const currentData = state.fileList__
          .map((item: any) => {
            return item.response?.fileName || item.url
          })
          .join(',')
        state.currentValue = currentData
      },
      // 手动调用上传的方法
      submit() {
        // this.$refs[this.ref].submit()
      }
    })
    // 校验文件
    const validateFile = (file: any, types: Array<any>, size: number) => {
      // 校验入参size
      if (!size || size <= 0 || size > 10 * 1024 * 1024) {
        return '入参size必须 大于0且小于' + 10 * 1024 * 1024 + '字节'
      }
      // 校验文件大小
      if (file.size > size) {
        return '上传文件大小不能超过 ' + (size / 1024 / 1024).toFixed(2) + 'M!'
      }
      // 开始校验文件类型
      let typeCheck = true
      if (types && types.length > 0) {
        typeCheck = false
        for (let i = 0; i < types.length; i++) {
          if (file.type === types[i]) {
            typeCheck = true
            break
          }
        }
      }
      if (!typeCheck) {
        return '上传文件类型只能是 ' + types.join('或者')
      }
      return true
    }
    return { ...toRefs(state) }
  }
})
</script>

<style lang="scss" scoped="">
.ele-form-upload-image {
  width: 100%;
  .el-icon-close-tip {
    display: none !important;
  }
  .el-upload--picture-card {
    margin-bottom: 12px;
  }
}
</style>
