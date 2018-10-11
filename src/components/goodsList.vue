<template>
  <div class="list">
  	<i-row i-class="row-class">
  	  <i-col span="12"  i-class="col-class" v-for="(goods, index) in goodsData" :key="index">
	  	<navigator class="card"  :url="'/pages/goodsItem/main?id=' + goods._id">
	  	  <div class="img">
	        <img :src="goods.icon[0]" alt="">
	        <p></p>
	      </div>
	      <div class="title">
	      	<p class="price">
	      		<span class="nprice">￥{{goods.price}}</span>
	      		<span class="oprice">￥{{goods.oprice}}</span>
	      	</p>
	      	<div class="flex-sb">
		      	<span class="name">{{goods.name}}</span>
		      	<span >{{goods.date}}</span>
	      	</div>
	      </div>
		 </navigator>
	   </i-col>
	 </i-row>	
  </div>
</template>

<script>
export default {
  props: ['goodsData']
}
</script>

<style>
.card img {
	width: 100%;
	height: 300rpx;
}
.row-class{
	padding: 10rpx;
}
.col-class {
	padding: 10rpx;
}
.card.title{
	padding: 20rpx;
}
.title{
	padding: 20rpx;
	font-size: 25rpx;
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
	max-width: 60%;
	display: inline-block;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
</style>
