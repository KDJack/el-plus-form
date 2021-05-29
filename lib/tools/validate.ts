/**
 * 获取通用的校验规则
 */

/**
 * 不能为空
 */
export const notNull = [{ required: true, trigger: 'blur', validator: validateInputNotBull }]

/**
 * 必须是数字
 */
export const number = [{ type: 'number', message: '请填入数字！' }]

/**
 * 校验验证码
 */
export const vCode = [{ required: true, trigger: 'blur', validator: validateValidateCode }]

/**
 * 必须是数字且不为空
 */
export const numberNotNull = [
  { required: true, message: '不能为空！', trigger: 'blur' },
  { type: 'number', message: '请填入数字！' }
]

/**
 * 正整数
 */
export const zhengZhengShu = [{ required: true, trigger: 'blur', validator: validateZhengZhengShu }]

/**
 * Double类型
 */
export const double = [{ trigger: 'blur', validator: validateDouble }]
/**
 * Double类型且必填
 */
export const doubleNotNull = [{ required: true, trigger: 'blur', validator: validateDouble }]

/**
 * 选择
 */
export const select = [{ required: true, trigger: 'change', validator: validateSelect }]

/**
 * 级联选择
 * @type {[*]}
 */
export const cascader = [{ required: true, trigger: 'change', validator: validateSelect }]

/**
 * 必须上传
 */
export const upload = [{ required: true, trigger: 'change', validator: validateUpload }]

/**
 * 正整数校验
 * @param rule
 * @param value
 * @param callback
 */
function validateZhengZhengShu(rule: any, value: any, callback?: any) {
  if (!/^[1-9]\d*$/.test(value * 1 + '')) {
    callback(new Error('请输入正整数！'))
  } else {
    callback()
  }
}

/**
 * 选择
 * @param rule
 * @param value
 * @param callback
 */
function validateValidateCode(rule: any, value: any, callback?: any) {
  if (value.length !== 4) {
    callback(new Error('验证码必须是4位！'))
  } else {
    callback()
  }
}

/**
 * 选择
 * @param rule
 * @param value
 * @param callback
 */
function validateInputNotBull(rule: any, value: any, callback?: any) {
  if (typeof value === 'undefined' || value === '') {
    callback(new Error('此项必填！'))
  } else {
    callback()
  }
}

/**
 * 选择
 * @param rule
 * @param value
 * @param callback
 */
function validateSelect(rule: any, value: any, callback?: any) {
  if (value === null || typeof value === 'undefined' || value === '' || value.length <= 0) {
    callback(new Error('请选择！'))
  } else {
    callback()
  }
}

/**
 * 上传
 * @param rule
 * @param value
 * @param callback
 */
function validateUpload(rule: any, value: any, callback?: any) {
  if (value === null || typeof value === 'undefined' || value === '' || value.length <= 0) {
    callback(new Error('请上传！'))
  } else {
    callback()
  }
}

/**
 * 小数校验规则
 * @param rule
 * @param value
 * @param callback
 */
function validateDouble(rule: any, value: any, callback?: any) {
  if (!/^\d+(\.(\d{1}|\d{2}))?$/.test(value * 1 + '')) {
    callback(new Error('小数格式错误(最多两位)!'))
  } else {
    callback()
  }
}
