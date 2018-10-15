import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    usingComponents: {
      'i-card': '/static/iview/card/index',
      'i-button': '/static/iview/button/index',
      'i-icon': '/static/iview/icon/index',
      'i-toast': '/static/iview/toast/index',
      'skeleton': '/static/skeleton/skeleton',
      'i-action-sheet': '/static/iview/action-sheet/index',
      'canvasdrawer': '../../../static/canvasdrawer/canvasdrawer'
    }
  }
}
