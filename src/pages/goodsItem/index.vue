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
    		<div class="fr">
    			<span class="oprice">￥{{goods.goods_oprice}}</span>
    			<span class="nprice">￥{{goods.goods_nprice}}</span>
    		</div>
    	</div>
    	<div class="goods-classify">分类：{{goods.gclassify.name}}</div>
    	<div class="goods-address">地址：{{goods.goods_address}}</div>
    	<div class="goods-summary">{{goods.goods_summary}}</div>
    </div>
    <div class="card user-card">
    	<div class="user clearfix">
    		<div class="fl">
    			<image :src="'http://api.songstar.cn' + guser.icon"/>
    	        <span class="user-name">{{guser.name}}</span>
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
    		<div class="fl">留言（{{goods.goods_lmsg.length}}）</div>
    		<div class="fr">{{goods.fans_num}}人想要</div>
    	</div>
    </div>
  </div>
</template>
<script>
  import fetch from '@/utils/fetch'
  export default{
    data () {
      return {
        goods: {},
        indicatorDots: true,
        interval: 5000,
        hasMore: true
      }
    },
    computed: {
      guser () {
        return this.goods.user
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
.goods-info .oprice{
	font-size: 30rpx;
	margin-right: 20rpx;
	color: #999;
	text-decoration: line-through;
}
.goods-info .nprice {
	color: #f40;
}
.goods-info .goods-summary {
	margin: 20rpx 0;
	font-size: 27rpx;
}
.user image{
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;
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
</style>
