<template>
  <div class="list">
  	<navigator class="card col-12" v-for="(goods, index) in goodsData" :key="index" :url="'/pages/goodsItem/main?id=' + goods.goods_id">
  	  <div class="img">
        <img :src="'http://api.songstar.cn' + goods.goods_icon[0].url" alt="">
        <p></p>
      </div>
      <div class="title clearfix">
      	<p class="price">
      		<span class="nprice">￥{{goods.goods_nprice}}</span>
      		<span class="oprice">￥{{goods.goods_oprice}}</span>
      	</p>
      	<span class="name fl">{{goods.goods_name}}</span>
      	<span class="fr">{{goods.goods_time}}</span>
      </div>
	 </navigator>
  </div>
</template>

<script>
export default {
  props: ['goodsData']
}
</script>

<style scoped>
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
	width: 70%;
	display: inline-block;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
</style>
