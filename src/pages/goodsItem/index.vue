<template>
  <div class="bg-gray skeleton">
    <skeleton selector="skeleton"
          loading="chiaroscuro"
          bgcolor="#FFF"
          v-if="!hasData"></skeleton>
    <swiper :indicator-dots="indicatorDots" class="skeleton-rect"
      :interval="interval" indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" style="height: 500rpx;">
      <block v-for="(item, index) in goods.icon" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="goods-info">
    	<div class="goods-heard clearfix">
    		<div class="fl goods-name skeleton-rect">{{goods.name}}</div>
    		<div class="fr price-item skeleton-rect">
    			<span class="oprice">￥{{goods.oprice}}</span>
    			<span class="nprice">￥{{goods.price}}</span>
    		</div>
    	</div>
    	<div class="goods-classify info-item skeleton-rect"><span class="label">分类：</span>{{goods.classify.name}}</div>
    	<div class="goods-address info-item skeleton-rect"><span class="label">地址：</span>{{goods.address}}</div>
    	<div class="goods-detail skeleton-rect">{{goods.detail}}</div>
    </div>
    <div class="card-user">
      <i-card :title="goods.user.nickName" extra="查看更多" :thumb="goods.user.avatarUrl">
        <view slot="content" class="skeleton-rect">联系方式： {{goods.user.number}}</view>
        <view slot="footer" class="skeleton-rect">发布学校： {{goods.school.name}}</view>
      </i-card>
    </div>
    <!-- <div class="lmsg">
    	<div class="lmsg-heard clearfix">
    		<div class="fl">留言（{{lmsg.length}}）</div>
    		<div class="fr">{{goods.fans_num}}人想要</div>
    	</div>
      <div class="lmsg-input">
        <open-data type="userAvatarUrl" class="user-icon"></open-data>
        <input v-model="inputValue" maxlength="255" placeholder="您有什么想说的..." class="input"/>
        <button type="primary" size="mini" class="btn" @click="send_msg" > 发送 </button>
      </div>
      <comment-box :lmsg="lmsg"></comment-box>
    </div> -->
    <div class="footer">
      <navigator class="item" open-type="switchTab" url="/pages/index/main">
        <i-icon size="24" type="homepage" color="#ff9900"/>
      </navigator>
      <div class="item" @click="showShare">
        <i-icon size="24" type="share" color="#19be6b"/>
      </div>
      <div class="item" @click="loveGoods">
        <i-icon size="24" type="like_fill" color="#ed3f14" v-if="goods.isLove"/>
        <i-icon size="24" type="like" color="#ed3f14" v-else/>
      </div>
      <div class="btn">
        <i-button type="success" shape="circle" i-class="small-btn">联系卖家</i-button>
      </div>
    </div>
    <i-action-sheet :visible="isShowShare" show-cancel @cancel="closeShare" @iclick="toShare" :actions="share"></i-action-sheet>
    <div class="share-card" :class="{ hide: !isShowShareCard }">
      <img :src="shareImage" class="share-image" />
      <div class="btn">
        <i-button i-class="btn-item"  type="default" @click="isShowShareCard = false" li>取  消</i-button>
        <i-button i-class="btn-item" type="warning" @click="saveImage">保存到相册</i-button>
      </div>
    </div>
    <canvasdrawer :painting="painting" class="canvasdrawer" @getImage="getImage"/>
    <i-toast id="toast" />
  </div>
</template>
<script>
  import {formatSchool, formatPrice} from '@/utils'
  import { $Toast } from '../../../static/iview/base/index'
  export default{
    data () {
      return {
        goods: {
          name: '可口可乐',
          price: 100,
          oprice: 100,
          icon: [],
          detail: '详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情',
          user: {
            nickName: 'name',
            avatarUrl: '/static/images/user-unlogin.png',
            number: 123456789
          },
          classify: {
            name: 'x'
          },
          school: {},
          lmsg: []
        },
        isShowShare: false,
        isShowShareCard: false,
        share: [{
          name: '分享给朋友',
          icon: 'share',
          openType: 'share'
        }, {
          name: '分享到朋友圈',
          icon: 'picture'
        }],
        painting: [],
        shareImage: '',
        bgShadow: '/static/images/bg-shadow.jpg',
        wechat: '/static/images/wechat.jpg',
        cardWidth: 275,
        imgWidth: 200,
        inputValue: '',
        indicatorDots: true,
        interval: 5000,
        hasData: false
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
      },
      loveGoods () {
        let that = this
        that.goods.isLove = !that.goods.isLove
        wx.cloud.callFunction({
          name: 'setLove',
          data: {
            gid: that.goods._id
          }
        }).then(res => {
          console.log(res)
        }).catch(r => {
          that.goods.isLove = !that.goods.isLove
        })
      },
      showShare () {
        this.isShowShare = true
      },
      closeShare () {
        this.isShowShare = false
      },
      toShare ({target: {index}}) {
        this.isShowShare = false
        if (index === 1) {
          // 制作分享图片
          this.drawCard()
        }
      },
      getImage (event) {
        console.log(event)
        $Toast.hide()
        this.isShowShareCard = true
        this.shareImage = event.target.tempFilePath
      },
      saveImage () {
        let that = this
        wx.saveImageToPhotosAlbum({
          filePath: this.shareImage,
          success (res) {
            wx.showToast({
              title: '保存图片成功',
              icon: 'success',
              duration: 2000
            })
            that.isShowShareCard = false
          }
        })
      },
      drawCard () {
        this.closeShare()
        $Toast({
          content: '卡片制作中',
          type: 'loading'
        })
        let {cardWidth, imgWidth, bgShadow, wechat, goods} = this
        this.painting = {
          width: cardWidth,
          height: 450,
          views: [
            {
              type: 'rect',
              background: '#fff',
              top: 0,
              left: 0,
              width: cardWidth,
              height: 450
            },
            {
              type: 'image',
              url: bgShadow,
              left: (cardWidth - imgWidth - 6) / 2,
              top: 27.5,
              width: imgWidth + 6,
              height: 255
            },
            {
              type: 'image',
              url: 'cloud://wx-erhuo-da63b9.7778-wx-erhuo-da63b9/goods/20181011/1539236894068.png',
              left: (cardWidth - imgWidth) / 2,
              top: 30,
              width: imgWidth,
              height: 190
            },
            {
              type: 'text',
              content: goods.name,
              textAlign: 'center',
              top: 230,
              left: cardWidth / 2
            },
            {
              type: 'text',
              content: `￥${formatPrice(goods.price)}`,
              textAlign: 'center',
              top: 255,
              left: cardWidth / 2,
              color: '#EE7942'
            },
            {
              type: 'image',
              url: wechat,
              left: (cardWidth - 75) / 2,
              top: 300,
              width: 75,
              height: 75
            },
            {
              type: 'text',
              content: '长按图片识别小程序码',
              fontSize: 14,
              textAlign: 'center',
              top: 390,
              left: cardWidth / 2
            },
            {
              type: 'text',
              content: '*实际价格以页面展示为准',
              color: '#80848f',
              fontSize: 11,
              textAlign: 'center',
              top: 415,
              left: cardWidth / 2
            }
          ]
        }
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (params) {
      if (params.id !== this.goods._id) {
        this.goods.icon = []
        this.hasData = false
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
          console.log('goods:', this.goods)
          wx.setNavigationBarTitle({ title: `二货 - ${this.goods.name}` })
          wx.hideLoading()
          this.hasData = true
        }).catch(e => {
          console.error(e)
          wx.hideLoading()
        })
      }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady () {
      wx.showShareMenu({
        withShareTicket: true
      })
      wx.setNavigationBarTitle({ title: '二货' })
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      console.log(this.goods.icon[0])
      return {
        title: `这里有一件【${this.goods.name}】等你来认领`,
        path: `/pages/goodsItem/main?id=${this.goods._id}`,
        imageUrl: this.goods.icon[0]
      }
    }
  }
</script>
<style>
page{
  margin-bottom: 110rpx;
}
.goods-info {
	padding: 20rpx;
	background: #fff;
  /*
	//font-size: 27rpx;*/
}
.goods-info .goods-heard {
  margin-bottom: 20rpx;
}
.goods-info .goods-heard .goods-name{
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
.goods-info .goods-address{
  margin-left: 40rpx;
}
.goods-info .info-item {
  display: inline-block;
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
  margin-left: 0;
}
.goods-info .goods-detail {
	margin: 20rpx 0;
	font-size: 27rpx;
}
.card-user{
  padding: 32rpx 0;
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
  display: flex;
  align-items: center;
  padding: 0 40rpx;
  box-sizing: border-box;
  z-index: 9999;
}
.footer>.item{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20rpx;
  color: #666;
  margin-right: 40rpx;
}
.footer>.btn{
  flex-grow: 1;
}
.footer>.btn .small-btn{
  height: 60rpx;
  line-height: 60rpx;
  margin-right: 0;
}
.share-card{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:rgba(55, 55, 55, 0.6);
  z-index: 999;
}
.share-card>.share-image{
  width: 550rpx;
  height: 900rpx;
  margin-bottom: 50rpx;
}
.share-card>.btn{
  width: 550rpx;
  display: flex;
  justify-content: space-between;
}
.share-card>.btn .btn-item{
  width: 220rpx;
  margin: 0;
}
</style>
