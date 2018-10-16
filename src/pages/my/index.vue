<template>
  <div>
    <div class="user-box">
      <button class="user-base-info" open-type="getUserInfo" @getuserinfo="onGetUserInfo" type="ghost" :long="true" v-if="!userInfo._id">
        <image class="avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
        <view class="username">{{userInfo.nickName}}</view>
      </button>
      <div class="user-base-info" @click="toUrl('/pages/userInfo/main')" v-else>
        <image class="avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
        <view class="username">{{userInfo.nickName}}</view>
      </div>
    </div>
    <div class="main">
      <navigator  class="main-item issue" url="/pages/myIssue/main">
        <i-icon type="document_fill" size="32" color="#19be6b" />
        <span>我发布的</span>
      </navigator >
      <navigator  class="main-item said">
        <i-icon type="task_fill" size="32" color="#19be6b" />
        <span>我卖出的</span>
      </navigator >
      <navigator  class="main-item buy">
        <i-icon type="service_fill" size="32" color="#19be6b" />
        <span>我买到的</span>
      </navigator >
      <navigator  class="main-item want">
        <i-icon type="tasklist_fill" size="32" color="#19be6b" />
        <span>我想要的</span>
      </navigator >
    </div>
    <i-cell-group>
      <i-cell title="关于我们" url="">
        <i-icon type="setup" slot="icon" size="20" />
      </i-cell>
      <!-- <i-cell title="客服热线" url="">
        <i-icon type="translation" slot="icon" size="20" />
        <span slot="footer">0731-5558888</span>
      </i-cell> -->
      <button class="hide" open-type="contact">
        <i-cell title="联系客服" url="">
          <i-icon type="customerservice" slot="icon" size="20" />
        </i-cell>
      </button>
      <button class="hide" open-type="share">
        <i-cell title="分享朋友" url="">
          <i-icon type="share" slot="icon" size="20" color="#19be6b"/>
        </i-cell>
      </button>
      <button class="hide" open-type="feedback">
        <i-cell title="意见反馈" url="">
          <i-icon type="prompt" slot="icon" size="20" />
        </i-cell>
      </button>
    </i-cell-group>
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
        gender: 1,
        sign: '',
        _id: 0
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `最二的校园二货交易平台，你确定不要加入？`,
      imageUrl: '/static/images/share.jpg',
      path: `/pages/index/main`
    }
  },
  methods: {
    onGetUserInfo ({ target: { userInfo } }) {
      this.userInfo.avatarUrl = userInfo.avatarUrl
      this.userInfo.nickName = userInfo.nickName
      this.userInfo.gender = userInfo.gender
      this.saveUserInfo()
    },
    saveUserInfo () {
      wx.cloud.callFunction({
        name: 'setUser',
        data: this.userInfo
      }).then(res => {
        console.log(res)
        this.userInfo._id = res.result._id
        wx.setStorageSync('userInfo', this.userInfo)
      })
    },
    getUserInfo () {
      wx.cloud.callFunction({
        name: 'getUser'
      }).then((res) => {
        console.log(res)
        if (res.result.data.length) {
          this.userInfo = res.result.data[0]
          wx.setStorageSync('userInfo', this.userInfo)
        }
      })
    },
    toUrl (url) {
      wx.navigateTo({
        url
      })
    }
  }
}
</script>
<style>
.user-base-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: 300rpx;
}

.user-base-info:after {
  border-radius: 0;
  border: none;
}

.user-base-info>.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.user-base-info>.username {
  font-size: 30rpx;
  font-weight: 500;
  margin-top: 20rpx;
}

.main {
  display: flex;
  padding: 50rpx 0;
}

.main>.main-item {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 20rpx;
  color: #666;
}

.main>.main-item>span {
  margin-top: 10rpx;
}

</style>
