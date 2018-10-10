import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    usingComponents: {
      'i-button': '/static/iview/button/index',
      'i-icon': '/static/iview/icon/index',
      'i-cell-group': '/static/iview/cell-group/index',
      'i-cell': '/static/iview/cell/index'
    }
  }
}
