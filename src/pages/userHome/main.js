import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '个人主页',
    navigationBarBackgroundColor: '#e8f9f0',
    navigationBarTextStyle: 'black',
    usingComponents: {
      'i-button': '/static/iview/button/index',
      'i-icon': '/static/iview/icon/index',
      'i-card': '/static/iview/card/index',
      'i-toast': '/static/iview/toast/index',
      'i-row': '/static/iview/row/index',
      'i-col': '/static/iview/col/index',
      'i-load-more': '/static/iview/load-more/index'
    }
  }
}
