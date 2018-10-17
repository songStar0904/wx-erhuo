<template>
  <div class="no-data">
  	<img src="/static/images/no_data.png" alt="">
  	<div class="title">{{title}}</div>
  	<navigator v-if="action" class="btn" :url="action.url" hover-class="none" :open-type="action.url === '/pages/index/main' ? 'switchTab': 'navigate'">{{action.title}}</navigator>
  </div>
</template>
<script>
export default {
  props: ['title', 'action'],
  data () {
    return {}
  }
}
</script>
<style scoped>
.no-data{
	display: flex;
	flex-direction: column;
	margin: 200rpx 0;
	text-align: center;
}
.no-data>img{
	width: 200rpx;
	height: 200rpx;
	margin: 80rpx auto;
}
.no-data>.title{
	font-size: 30rpx;
	color: #666;
}
.no-data>.btn{
	width: 300rpx;
	height: 70rpx;
	margin: 80rpx auto;
	line-height: 70rpx;
	background: #19be6b;
	font-size: 28rpx;
	color: #fff;
	border-radius: 8rpx;
}
</style>
