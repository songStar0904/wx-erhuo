<template>
	<div>
		<div class="comment-box" v-if="lmsg.length > 0">
			<div class="comment-item" v-for="(item, index) in lmsg">
				<image :src="'http://api.songstar.cn' + item.suser.icon"/>
				<div class="comment-info">
					<div class="comment-header">
						<span class="user-name">{{item.suser.name}}</span>
						<span class="send-time">{{item.lmsg_time}}</span>
					</div>
					<div class="comment-content">{{item.lmsg_content}}</div>
				</div>	
			</div>
		</div>
		<div class="noData" v-else> 暂无留言 </div>
	</div>
</template>
<script>
export default {
  props: {
    lmsg: {
      type: Object,
      default: []
    }
  }
}
</script>
<style scoped>
.noData {
	text-align: center;
}
.comment-item {
	display: flex;
	margin: 20rpx 0;
}
.comment-item image {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	margin-top: 10rpx;
}
.comment-item .comment-info {
	flex-grow: 1;
	margin-left: 40rpx;
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #e9eaec;
}
.comment-item .comment-info .comment-header {
	margin-bottom: 10rpx;
}
.comment-item .comment-info .user-name {
	font-size: 30rpx;
	color: #495060;
	margin-right: 20rpx;
}
.comment-item .comment-info .send-time {
	font-size: 20rpx;
	color:#bbbec4;
}
</style>
