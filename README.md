# el-plus-form | 基于 element-plus 的数据驱动表单组件

[![MIT Licence](https://img.shields.io/npm/l/el-plus-form.svg)](https://img.shields.io/apm/l/el-plus-form.svg)
[![npm](https://img.shields.io/npm/v/el-plus-form.svg)](https://www.npmjs.com/package/el-plus-form)

## 简介

> [el-plus-form](https://github.com/KDJack/el-plus-form) 是一个通用的、基于 vue3, ts 和 element-plusel 的表单解决方案，它大大的简化了表单的代码以及逻辑控制，完全可以通过 json 数据，控制整个表单的业务逻辑。该项目的基础版本，来源于张超杰大佬的[vue-ele-form](https://gitee.com/dream2023/vue-ele-form)

## 项目地址

[https://github.com/KDJack/el-plus-form](https://github.com/KDJack/el-plus-form)

## 可视化表单生成器

[![f-render 演示图](https://s1.ax1x.com/2020/08/23/d0T976.gif)](https://dream2023.gitee.io/f-render/)

生成器在线地址: [https://github.com/dream2023/f-render](https://github.com/dream2023/f-render)

## 安装

```bash
npm install el-plus-form --save # yarn add el-plus-form
```

## 使用

```js
import { createApp } from 'vue'
import App from './App.vue'
import ElPlusForm from 'el-plus-form'
// uploadImgAction 为图片上传的请求地址，如果没有该配置项，会导致图片上传组件不可用！！！
createApp(App).use(ElPlusForm, { uploadImgAction: 'http://www.xxxxx/xxx/xxx/xx/uplaod' })
```

```html
<el-plus-form v-bind="formConfig" :formData="formData"></el-plus-form>
```

```js
setup() {
    const state = reactive({
        formData: {},
        formConfig: {
            formDesc: {
                categoryNo: { type: 'input', label: '编号', require: true },
                displayName: { type: 'input', label: '名称', require: true },
                enabled: { type: 'switch', label: '启用状态', rules: 'select', default: 1 },
                iconName: { type: 'input', label: '图标' },
                imgUrl: { type: 'upimg', label: '图片', limit: 3 },
                introductionRatio: { type: 'nbInput', label: '引进比率' },
                operatingRatio: { type: 'nbInput', label: '运营比率' },
                preferentialRatio: { type: 'nbInput', label: '优惠比率' },
                salesRatio: { type: 'nbInput', label: '销售比率' },
                serviceRatio: { type: 'nbInput', label: '服务比率' },
                showOrder: { type: 'nbInput', label: '显示顺序' }
            },
            order: ['displayName', 'introductionRatio', 'categoryNo', 'operatingRatio', 'enabled', 'preferentialRatio', 'iconName', 'salesRatio', 'imgUrl','serviceRatio', 'showOrder'],
            column: 2
        }
    })
    return { ...toRefs(state) }
}
```

## DEMO(暂时没有时间搞，借用下张大佬的)

https://dream2023.github.io/vue-ele-form/

## 文档(暂时没有时间搞，借用下张大佬的)

https://www.yuque.com/chaojie-vjiel/vbwzgu

## \*使用说明

\*请将项目 VUE 版本更改至 3.0.5，不然会出现[神奇的问题](https://github.com/vuejs/vue-next/issues/2913)

当前版本还处于开发中，版本还不稳定，偶尔会更新。建议等到 1.x 版本后再使用...

## 写在最后

该项目属于个人项目，维护的时间和精力有限，如有问题可以提 ISSUES，同时非常欢迎你提交 PR
