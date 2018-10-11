import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    usingComponents: {
      'i-card': '/static/iview/card/index',
      'i-button': '/static/iview/button/index',
      'i-col': '/static/iview/col/index'
    }
  }
}
