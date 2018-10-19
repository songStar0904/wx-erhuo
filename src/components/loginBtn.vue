<template>
  <button :class="'login-btn '+isLogin" open-type="getUserInfo" @getuserinfo="onGetUserInfo" type="ghost" :long="true" v-if="!isLogin"></button>
</template>
<script>
export default {
  data () {
    return {
      isLogin: false
    }
  },
  computed: {
    userInfo () {
      return wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : {}
    },
    isLogin () {
      return wx.getStorageSync('isLogin') ? wx.getStorageSync('isLogin') : false
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.fetch('getUser').then((res) => {
        console.log(res)
        if (res.result.data.length) {
          wx.setStorageSync('userInfo', res.result.data[0])
          wx.setStorageSync('isLogin', true)
          this.isLogin = true
          this.$emit('setUserInfo', this.userInfo)
        } else {
          wx.setStorageSync('userInfo', null)
          wx.setStorageSync('isLogin', false)
          this.isLogin = false
        }
      })
    },
    onGetUserInfo ({ target: { userInfo } }) {
      if (userInfo) {
        this.userInfo.avatarUrl = userInfo.avatarUrl
        this.userInfo.nickName = userInfo.nickName
        this.userInfo.gender = userInfo.gender
        this.saveUserInfo()
      }
    },
    saveUserInfo () {
      this.fetch('setUser', this.userInfo).then(res => {
        this.userInfo._id = res.result._id
        wx.setStorageSync('userInfo', this.userInfo)
        wx.setStorageSync('isLogin', true)
        this.isLogin = true
        this.$emit('setUserInfo', this.userInfo)
        console.log(this.userInfo)
      })
    }
  }
}
</script>
<style scoped>
</style>
