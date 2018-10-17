<template>
  <div class="list">
  	<navigator class="goods-item border-b" v-for="(goods, index) in goodsData" :key="index"  :url="'/pages/goodsItem/main?id=' + goods._id" hover-class="none">
  	  <div class="img">
        <img :src="goods.icon[0]" alt="">
        <p></p>
      </div>
      <div class="goods-info">
      	<div class="flex-sb">
      		<span class="name">{{goods.name}}</span>
	      	<span >{{goods.date}}</span>
      	</div>
      	<p class="price">
      		<span class="nprice">￥{{goods.price}}</span>
      		<span class="oprice">￥{{goods.oprice}}</span>
      	</p>
      	<div class="btn-box">
      		<i-button i-class="btn" type="success" size="small" inline @click.stop="edit(goods._id)" v-if="uid === goods.uid">编辑</i-button>
      		<i-button i-class="btn" type="warning" size="small" inline @click.stop="del(goods._id)">{{type === 'want' ? '不想要' : '删除'}}</i-button>
      	</div>
      </div>
	 </navigator>
  </div>
</template>

<script>
export default {
  props: ['goodsData', 'type'],
  methods: {
    edit (_id) {
      wx.navigateTo({
        url: `/pages/issue/main?id=${_id}`
      })
    },
    del (_id) {
      this.$emit('delGoods', _id)
    }
  },
  computed: {
    uid () {
      return wx.getStorageSync('userInfo')._id || null
    }
  }
}
</script>

<style>
.goods-item{
	display: flex;
	padding: 40rpx 0;
	padding-right: 40rpx;
	margin-left: 40rpx;
}
.goods-item img {
	width: 150rpx;
	height: 150rpx;
}
.goods-item>.goods-info{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 40rpx;
	font-size: 28rpx;
}
.goods-info .name{
	font-size: 30rpx;
	font-weight: 500;
}
.goods-info .nprice{
	color: #f40;
}
.goods-info .oprice {
	margin-left: 20rpx;
	color: #999;
	text-decoration: line-through;
}
.goods-info>.btn-box{
	display: flex;
	justify-content: flex-end;
}
.goods-info .btn{
	margin: 0;
	margin-left: 40rpx;
	line-height: 50rpx;
	height: 50rpx;
}
</style>
