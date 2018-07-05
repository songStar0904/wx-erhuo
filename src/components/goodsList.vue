<template>
  <div class="list">	
	  <div class="card col-12" v-for="(goods, index) in goodsData" :key="index">
	  	<div class="img">
	      <img :src="'http://api.songstar.cn' + goods.goods_icon[0].url" alt="">
	      <p></p>
	    </div>
	      <div class="title clearfix">
	      	<p class="price">
	      		<span class="nprice">￥{{goods.goods_nprice}}</span>
	      		<span class="oprice">￥{{goods.goods_oprice}}</span>
	      	</p>
	      	<span class="name fr">{{goods.goods_name}}</span>
	      	<span class="name fl">{{goods.goods_time}}</span>
	      </div>
	  </div>
	  <div class="center">
	  	<p v-if="hasMore">玩命加载中。。。</p>
	    <p v-else>没有更多内容了</p>	
	  </div>
  </div>
</template>

<script>
export default {
  props: ['goodsData', 'hasMore']
}
</script>

<style>
.card {
    border: 1px solid #dddee1;
    border-color: #e9eaec;
    background: #fff;
    border-radius: 4rpx;
    font-size: 14rpx;
}
.card img {
	width: 100%;
	height: 300rpx;
}
.col-12 {
	display: inline-block;
	margin: 20rpx 4% 2%;
	width: 41%;
}
.card.title{
	padding: 20rpx;
}
.center{
	text-align: center;
}
.title{
	padding: 20rpx;
	font-size: 20rpx;
}
.title .nprice{
	font-size: 35rpx;
	color: #f40;
}
.title .oprice {
	margin-left: 20rpx;
	color: #999;
	text-decoration: line-through;
}
.title .name {
	display: inline-block;
	font-size: 25rpx;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
</style>
