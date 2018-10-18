import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.fetch = function (name, data) {
  wx.showNavigationBarLoading()
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      // 云函数名称
      name,
      // 传给云函数的参数
      data
    }).then(res => {
      wx.hideNavigationBarLoading()
      resolve(res)
    }).catch(res => {
      wx.hideNavigationBarLoading()
      reject(res)
    })
  })
}
export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/my/main', '^pages/index/main', 'pages/goodsItem/main', 'pages/issue/main', 'pages/myIssue/main', 'pages/myWant/main', 'pages/userInfo/main', 'pages/userHome/main'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#19be6b',
      navigationBarTitleText: '二 货',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      selectedColor: '#19be6b',
      borderStyle: 'black',
      backgroundColor: '#fff',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: 'static/images/home.png',
        selectedIconPath: 'static/images/home_s.png'
      }, {
        pagePath: 'pages/index/main',
        text: '发布',
        iconPath: 'static/images/add_s.png',
        selectedIconPath: 'static/images/add_s.png'
      }, {
        pagePath: 'pages/my/main',
        text: '我的',
        iconPath: 'static/images/my.png',
        selectedIconPath: 'static/images/my_s.png'
      }]
    }
  }
}
