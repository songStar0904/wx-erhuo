<template>
  <div>
    <button class="user-base-info" open-type="getUserInfo" @getuserinfo="onGetUserInfo" type="ghost" :long="true" v-if="!userInfo._id">
      <image class="avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
      <view class="username">{{userInfo.nickName}}</view>
    </button>
    <div class="user-base-info" v-else>
      <image class="avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
      <view class="username">{{userInfo.nickName}}</view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        avatarUrl: '/static/images/user-unlogin.png',
        nickName: '点击获得用户名',
        number: '',
        address: '',
        _id: 0
      }
    }
  },

  created () {
    this.getUserInfo()
  },
  methods: {
    onGetUserInfo ({target: {userInfo}}) {
      this.userInfo.avatarUrl = userInfo.avatarUrl
      this.userInfo.nickName = userInfo.nickName
      this.saveUserInfo()
    },
    saveUserInfo () {
      wx.cloud.callFunction({
        name: 'setUser',
        data: this.userInfo
      })
    },
    getUserInfo () {
      wx.cloud.callFunction({
        name: 'getUser'
      }).then((res) => {
        console.log(res)
        if (res.result.data.length) {
          this.userInfo = res.result.data[0]
        }
      })
    }
  }
}
</script>

<style>
.user-base-info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: 300rpx;
}
.user-base-info:after{
  border-radius: 0;
  border: none;
}
.user-base-info>.avatar{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 1rpx solid #e0e0e0;
}
.user-base-info>.username{
  font-size: 30rpx;
  font-weight: 500;
  margin-top: 20rpx;
}
</style>
