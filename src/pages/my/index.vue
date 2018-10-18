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
      <div  class="main-item said" url="" @click="warning('该功能暂未开放！')">
        <i-icon type="task_fill" size="32" color="#19be6b" />
        <span>我卖出的</span>
      </div >
      <div  class="main-item buy" url="" @click="warning('该功能暂未开放！')">
        <i-icon type="service_fill" size="32" color="#19be6b" />
        <span>我买到的</span>
      </div >
      <navigator  class="main-item want" url="/pages/myWant/main">
        <i-icon type="tasklist_fill" size="32" color="#19be6b" />
        <span>我想要的</span>
      </navigator >
    </div>
    <i-cell-group>
      <!-- <i-cell title="客服热线" url="">
        <i-icon type="translation" slot="icon" size="20" />
        <span slot="footer">0731-5558888</span>
      </i-cell> -->
      <button class="hide" open-type="share">
        <i-cell title="分享朋友" url="">
          <i-icon type="share" slot="icon" size="20" color="#19be6b"/>
        </i-cell>
      </button>
      <button class="hide" open-type="contact">
        <i-cell title="联系客服" url="">
          <i-icon type="customerservice" slot="icon" size="20" />
        </i-cell>
      </button>
      <button class="hide" open-type="feedback">
        <i-cell title="意见反馈" url="">
          <i-icon type="prompt" slot="icon" size="20" />
        </i-cell>
      </button>
      <i-cell title="关于二货街" url="" @click="isShowAbout = true">
        <i-icon type="setup" slot="icon" size="20" />
      </i-cell>
    </i-cell-group>
    <i-modal title="关于二货街" :visible="isShowAbout" @ok="closeAbout" @cancel="closeAbout" ok-text="知道啦" i-class="about-box">
      <div class="about">
        <p><span></span>校园二货街是针对校园二手物品的交易平台。由于此公众平台的主体是个人，所以暂时没有微信支付功能和自动获取手机绑定功能，请见谅。</p>
        <h3>校园二货街小程序所用到的技术栈</h3>
        <p>- 微信小程序</p>
        <p>- Mpvue</p>
        <p>- iView-Weapp</p>
        <p>- 小程序·云开发</p>
        <h3>关于作者</h3>
        <p>github：https://github.com/songStar0904</p>
        <p>email：   1043328710@qq.com</p>
      </div>
  </i-modal>
  <i-message id="message" />
  </div>
</template>
<script>
import { $Message } from '../../../static/iview/base/index'
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
      },
      isShowAbout: false
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
    warning (msg) {
      $Message({
        content: msg,
        type: 'warning'
      })
    },
    onGetUserInfo ({ target: { userInfo } }) {
      this.userInfo.avatarUrl = userInfo.avatarUrl
      this.userInfo.nickName = userInfo.nickName
      this.userInfo.gender = userInfo.gender
      this.saveUserInfo()
    },
    saveUserInfo () {
      this.fetch('setUser', this.userInfo).then(res => {
        console.log(res)
        this.userInfo._id = res.result._id
        wx.setStorageSync('userInfo', this.userInfo)
      })
    },
    getUserInfo () {
      this.fetch('getUser').then((res) => {
        console.log(res)
        if (res.result.data.length) {
          this.userInfo = res.result.data[0]
          wx.setStorageSync('userInfo', this.userInfo)
        }
      })
    },
    closeAbout () {
      this.isShowAbout = false
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
.about-box {
  overflow: hidden!important;
}
.about-box>view{
  width: 600rpx;
}
.about-box>view>view>view{
  max-height: 900rpx !important;
}
.about{
  text-align: left;
  padding: 0 40rpx;
}

.about>p{
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}
.about>p>span{
  display: inline-block;
  width: 50rpx;
}
.about>h3{
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin: 30rpx 0 20rpx;
}

</style>
