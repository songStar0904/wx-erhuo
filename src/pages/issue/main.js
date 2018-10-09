import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '发布',
    usingComponents: {
      'i-button': '/static/iview/button/index',
      'i-notice-bar': '/static/iview/notice-bar/index',
      'i-panel': '/static/iview/panel/index',
      'i-icon': '/static/iview/icon/index',
      'i-input': '/static/iview/input/index',
      'i-cell-group': '/static/iview/cell-group/index',
      'i-cell': '/static/iview/cell/index',
      'i-action-sheet': '/static/iview/action-sheet/index',
      'i-toast': '/static/iview/toast/index'
    }
  }
}
