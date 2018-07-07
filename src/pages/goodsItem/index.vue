<template>
  <div class="bg-gray">
    <swiper :indicator-dots="indicatorDots"
      :interval="interval" indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" style="height: 500rpx;">
      <block v-for="(item, index) in goods.goods_icon" :key="index">
        <swiper-item>
          <image :src="'http://api.songstar.cn' + item.url" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="goods-info">
    	<div class="goods-heard clearfix">
    		<div class="fl goods-name">{{goods.goods_name}}</div>
        <Tag color="#f40">aasd</Tag>
    		<div class="fr">
    			<span class="oprice">￥{{goods.goods_oprice}}</span>
    			<span class="nprice">￥{{goods.goods_nprice}}</span>
    		</div>
    	</div>
    	<div class="goods-classify info-item"><span class="label">分类：</span>{{goods.gclassify.name}}</div>
    	<div class="goods-address info-item"><span class="label">地址：</span>{{goods.goods_address}}</div>
    	<div class="goods-summary">{{goods.goods_summary}}</div>
    </div>
    <div class="card user-card">
    	<div class="user clearfix">
    		<div class="fl">
    			<image :src="'http://api.songstar.cn' + guser.icon" class="fl"/>
    	        <span class="fl">
               <p class="user-name">{{guser.name}}</p>
               <p class="user-school">{{guser.sid}}</p>
              </span>
    		</div>
    		<div class="fr">></div>
    	</div>
    	<div class="user-info">
    		<span class="flex-8">
    			<p>在售</p>
    			<p>23</p>
    		</span>
    		<span class="flex-8">
    			<p>在售</p>
    			<p>23</p>
    		</span>
    		<span class="flex-8">
    			<p>在售</p>
    			<p>23</p>
    		</span>
    	</div>
    </div>
    <div class="lmsg">
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
    </div>
  </div>
</template>
<script>
  import {Tag} from '@/components'
  import commentBox from '@/components/commentBox'
  import {formatSchool} from '@/utils'
  import fetch from '@/utils/fetch'
  export default{
    components: {
      Tag,
      commentBox
    },
    data () {
      return {
        goods: {
          user: {
            sid: 448
          },
          gclassify: {
            name: 'x'
          },
          goods_lmsg: []
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
        return this.goods.goods_lmsg
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
  
      fetch('goods/get_one', {
        goods_id: params.id
      }).then(d => {
        let goods = d.data.data
        this.goods = goods
        wx.setNavigationBarTitle({ title: `二货 - ${goods.goods_name}` })
        wx.hideLoading()
      }).catch(e => {
        this.setData({ title: '获取数据异常', movie: {} })
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
<style scoped>
.goods-info {
	padding: 20rpx;
	background: #fff;/*
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
.goods-info .goods-summary {
	margin: 20rpx 0;
	font-size: 27rpx;
}
.user image{
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;
  margin-right: 20rpx;
}
.user-card {
	margin: 20rpx;
	padding: 20rpx;
}
.user-card .user{
	margin-bottom: 20rpx;
	padding-bottom: 20rpx;
	border-bottom: 1px solid #dddee1;
}
.user-card .user .user-name{
	font-weight: 600;
	font-size: 30rpx;
}
.user-card .user-info{
	display: -webkit-flex; /* Safari */
    display: flex;
    justify-content:space-around;
}
.user-card .user-info{
	text-align: center;
}
.lmsg {
	background: #fff;
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
</style>
