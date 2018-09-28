import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    enablePullDownRefresh: true,
    usingComponents: {
      'i-load-more': '/static/iview/load-more/index'
    }
  }
}
