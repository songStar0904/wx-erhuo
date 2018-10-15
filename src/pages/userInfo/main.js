import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '个人信息',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    usingComponents: {
      'i-button': '/static/iview/button/index',
      'i-icon': '/static/iview/icon/index',
      'i-cell-group': '/static/iview/cell-group/index',
      'i-cell': '/static/iview/cell/index',
      'i-input': '/static/iview/input/index',
      'i-radio-group': '/static/iview/radio-group/index',
      'i-radio': '/static/iview/radio/index',
      'i-toast': '/static/iview/toast/index'
    }
  }
}
