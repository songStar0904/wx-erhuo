<template>
  <div class="bg-gray">
    <swiper :indicator-dots="indicatorDots"
      :interval="interval" indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" style="height: 500rpx;">
      <block v-for="(item, index) in goods.icon" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="goods-info">
    	<div class="goods-heard clearfix">
    		<div class="fl goods-name">{{goods.name}}</div>
    		<div class="fr">
    			<span class="oprice">￥{{goods.oprice}}</span>
    			<span class="nprice">￥{{goods.price}}</span>
    		</div>
    	</div>
    	<div class="goods-classify info-item"><span class="label">分类：</span>{{goods.classify.name}}</div>
    	<div class="goods-address info-item"><span class="label">地址：</span>{{goods.address}}</div>
    	<div class="goods-detail">{{goods.detail}}</div>
    </div>
    <i-card :title="goods.user.nickName" extra="查看更多" :thumb="goods.user.avatarUrl" i-class="card-user">
      <view slot="content">联系方式： {{goods.user.number}}</view>
      <view slot="footer">发布学校： {{goods.school.name}}</view>
  </i-card>
    <div class="lmsg">
    	<!-- <div class="lmsg-heard clearfix">
    		<div class="fl">留言（{{lmsg.length}}）</div>
    		<div class="fr">{{goods.fans_num}}人想要</div>
    	</div>
      <div class="lmsg-input">
        <open-data type="userAvatarUrl" class="user-icon"></open-data>
        <input v-model="inputValue" maxlength="255" placeholder="您有什么想说的..." class="input"/>
        <button type="primary" size="mini" class="btn" @click="send_msg" > 发送 </button>
      </div>
      <comment-box :lmsg="lmsg"></comment-box> -->
    </div>
    <div class="footer">
      <i-button type="success" shape="circle" i-class="btn">联系卖家</i-button>
    </div>
  </div>
</template>
<script>
  import commentBox from '@/components/commentBox'
  import {formatSchool} from '@/utils'
  export default{
    components: {
      commentBox
    },
    data () {
      return {
        goods: {
          user: {
            sid: 448
          },
          classify: {
            name: 'x'
          },
          school: {},
          lmsg: []
        },
        inputValue: '',
        indicatorDots: true,
        interval: 5000,
        hasMore: true
      }
    },
    computed: {
      guser () {
        this.goods.user.sid = formatSchool(this.goods.user.sid)
        return this.goods.user
      },
      lmsg () {
        return this.goods.lmsg
      }
    },
    methods: {
      send_msg () {
        console.log(this.inputValue)
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (params) {
      wx.showLoading({ title: '拼命加载中...' })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getOneGood',
        // 传给云函数的参数
        data: {
          _id: params.id
        }
      }).then(res => {
        this.goods = res.result
        console.log(this.goods)
        wx.setNavigationBarTitle({ title: `二货 - ${this.goods.name}` })
        wx.hideLoading()
      }).catch(e => {
        console.error(e)
        wx.hideLoading()
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady () {
      wx.setNavigationBarTitle({ title: '二货' })
    }
  }
</script>
<style>
.goods-info {
	padding: 20rpx;
	background: #fff;
  margin-bottom: 40rpx;
  /*
	//font-size: 27rpx;*/
}
.goods-info .goods-heard {
  margin-bottom: 20rpx;
}
.goods-info .oprice{
	font-size: 30rpx;
	margin-right: 20rpx;
	color: #999;
	text-decoration: line-through;
}
.goods-info .nprice {
	color: #f40;
}
.goods-info .info-item {
  font-size: 27rpx;
}
.goods-info .info-item .label {
  display: inline-block;
  width: 100rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  background: #eee;
  color: #80848f;
  border-radius: 30rpx;
  margin: 8rpx 20rpx;
}
.goods-info .goods-detail {
	margin: 20rpx 0;
	font-size: 27rpx;
}
.card-user{
}
.card-user image{
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
  margin-right: 20rpx;
}
.lmsg {
	background: #fff;
  margin-top: 40rpx;
  margin-bottom: 110rpx;
	padding: 20rpx;
	font-size: 28rpx;
}
.lmsg .lmsg-input {
  display: flex;
  margin: 20rpx 0;
}
.lmsg .lmsg-input .user-icon{
  display: inline-block;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}
.lmsg .lmsg-input .input {
  flex-grow: 1;
  padding: 5rpx 20rpx;
  margin-left: 40rpx;
  background: #e9eaec;
}
.lmsg .lmsg-input:before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-width: 15rpx 15rpx 15rpx 0;
  border-style: solid;
  border-color: transparent #e9eaec transparent transparent;/*透明 黄 透明 透明 */
  position: absolute;
  left: 108rpx;
  bottom: 10rpx;
}
.lmsg .lmsg-input .btn {
  border-radius: 0;
  margin: 0;
}
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 1rpx solid #eee;
}
.footer .btn{
  height: 70rpx;
  line-height: 70rpx;
}
</style>
