import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我的发布',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    usingComponents: {
      'i-button': '/static/iview/button/index',
      'i-icon': '/static/iview/icon/index',
      'i-tabs': '/static/iview/tabs/index',
      'i-tab': '/static/iview/tab/index',
      'i-message': '/static/iview/message/index',
      'i-modal': '/static/iview/modal/index',
      'i-load-more': '/static/iview/load-more/index',
      'i-input': '/static/iview/input/index',
      'i-radio-group': '/static/iview/radio-group/index',
      'i-radio': '/static/iview/radio/index',
      'i-toast': '/static/iview/toast/index'
    }
  }
}
