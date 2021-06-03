import { App } from 'vue'
import ElPlusForm from './ElPlusForm.vue'
import ElPlusFormDialog from './ElPlusFormDialog.vue'
import ElPlusFormBtn from './components/ElPlusFormBtn.vue'
import ElPlusFormTag from './components/ElPlusFormTag.vue'
import ElPlusFormBtns from './components/ElPlusFormBtns.vue'
import ElPlusFormDate from './components/ElPlusFormDate.vue'
import ElPlusFormRate from './components/ElPlusFormRate.vue'
import ElPlusFormText from './components/ElPlusFormText.vue'
import ElPlusFormTime from './components/ElPlusFormTime.vue'
import ElPlusFormWeek from './components/ElPlusFormWeek.vue'
import ElPlusFormYear from './components/ElPlusFormYear.vue'
import ElPlusFormColor from './components/ElPlusFormColor.vue'
import ElPlusFormDates from './components/ElPlusFormDates.vue'
import ElPlusFormImage from './components/ElPlusFormImage.vue'
import ElPlusFormInput from './components/ElPlusFormInput.vue'
import ElPlusFormMonth from './components/ElPlusFormMonth.vue'
import ElPlusFormRadio from './components/ElPlusFormRadio.vue'
import ElPlusFormUpImg from './components/ElPlusFormUpImg.vue'
import ElPlusFormYesno from './components/ElPlusFormYesno.vue'
import ElPlusFormNumber from './components/ElPlusFormNumber.vue'
import ElPlusFormSelect from './components/ElPlusFormSelect.vue'
import ElPlusFormSlider from './components/ElPlusFormSlider.vue'
import ElPlusFormStatus from './components/ElPlusFormStatus.vue'
import ElPlusFormSwitch from './components/ElPlusFormSwitch.vue'
import ElPlusFormNbInput from './components/ElPlusFormNbInput.vue'
import ElPlusFormCascader from './components/ElPlusFormCascader.vue'
import ElPlusFormCheckbox from './components/ElPlusFormCheckbox.vue'
import ElPlusFormDatetime from './components/ElPlusFormDatetime.vue'
import ElPlusFormPassword from './components/ElPlusFormPassword.vue'
import ElPlusFormTextarea from './components/ElPlusFormTextarea.vue'
import ElPlusFormTransfer from './components/ElPlusFormTransfer.vue'
import ElPlusFormDaterange from './components/ElPlusFormDaterange.vue'
import ElPlusFormTimerange from './components/ElPlusFormTimerange.vue'
import ElPlusFormMonthrange from './components/ElPlusFormMonthrange.vue'
import ElPlusFormTimePicker from './components/ElPlusFormTimePicker.vue'
import ElPlusFormRadioButton from './components/ElPlusFormRadioButton.vue'
import ElPlusFormAutocomplete from './components/ElPlusFormAutocomplete.vue'
import ElPlusFormCascaderPanel from './components/ElPlusFormCascaderPanel.vue'
import ElPlusFormDatetimerange from './components/ElPlusFormDatetimerange.vue'
import ElPlusFormCheckboxButton from './components/ElPlusFormCheckboxButton.vue'

const components = [
  ElPlusForm,
  ElPlusFormDialog,
  ElPlusFormBtn,
  ElPlusFormTag,
  ElPlusFormBtns,
  ElPlusFormDate,
  ElPlusFormRate,
  ElPlusFormText,
  ElPlusFormTime,
  ElPlusFormWeek,
  ElPlusFormYear,
  ElPlusFormColor,
  ElPlusFormDates,
  ElPlusFormImage,
  ElPlusFormInput,
  ElPlusFormMonth,
  ElPlusFormRadio,
  ElPlusFormUpImg,
  ElPlusFormYesno,
  ElPlusFormNumber,
  ElPlusFormSelect,
  ElPlusFormSlider,
  ElPlusFormStatus,
  ElPlusFormSwitch,
  ElPlusFormNbInput,
  ElPlusFormCascader,
  ElPlusFormCheckbox,
  ElPlusFormDatetime,
  ElPlusFormPassword,
  ElPlusFormTextarea,
  ElPlusFormTransfer,
  ElPlusFormDaterange,
  ElPlusFormTimerange,
  ElPlusFormMonthrange,
  ElPlusFormTimePicker,
  ElPlusFormRadioButton,
  ElPlusFormAutocomplete,
  ElPlusFormCascaderPanel,
  ElPlusFormDatetimerange,
  ElPlusFormCheckboxButton
]

const ElPlusFormUI = {
  install: (app: App, options: any) => {
    if (!options || !options.uploadImgAction) {
      console.warn('[el-plus-form warn]: 缺少属性：uploadImgAction，会导致ElPlusFormUpImg(图片上传组件)不可用!')
    } else {
      app.config.globalProperties.uploadImgAction = options.uploadImgAction
    }
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
}
export default ElPlusFormUI
