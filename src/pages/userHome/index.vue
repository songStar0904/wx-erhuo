<template>
  <div class="user-home">
    <div class="card-user bg-primary">
      <i-card  i-class="u-card" i-footer="u-footer" :title="userInfo.nickName" extra="举报" :thumb="userInfo.avatarUrl">
        <div slot="content" class="skeleton-rect content">
        	<p>联系方式： {{userInfo.number || '无'}}</p>
        	<p>所在学校： {{userInfo.school ? userInfo.school.name : '未知'}}</p>
        </div>
        <div slot="footer"><p>{{userInfo.sign || '这个人很懒，啥都没写。'}}</p></div>
      </i-card>
    </div>
    <div class="title">累计发布二货{{total}}件</div>
  	<block v-if="!hasData && !loading">
  	    <no-data title="暂无数据" ></no-data>
  	</block>
  	<div v-else>
  		<goods-list :goodsData="goodsData"></goods-list>
        <i-load-more :tip="loading ? '玩命加载中' : '暂无数据'" :loading="loading" />
  	</div>
    <i-message id="message" />
  </div>
</template>
<script>
import { formatTime } from '@/utils/index'
import goodsList from '@/components/goodsList'
import noData from '@/components/noData'
export default {
  data () {
    return {
      userInfo: {
        avatarUrl: '/static/images/user-unlogin.png',
        nickName: '获得用户名',
        number: '',
        address: '',
        gender: 1,
        sign: '',
        _id: 0,
        school: {
          name: 'xx'
        }
      },
      page: 0,
      num: 5,
      total: 0,
      uid: null,
      loading: false,
      goodsData: [],
      hasData: false
    }
  },
  onReachBottom () {
    this.loadMore()
  },
  components: {
    goodsList,
    noData
  },
  watch: {
    goodsData (val) {
      this.hasData = val.length > 0
    }
  },
  onLoad (param) {
    this.getUser(param.id)
    this.loadMore()
  },
  methods: {
    getUser (uid) {
      this.fetch('getUser', {
        uid
      }).then((res) => {
        console.log(res)
        if (res.result.data.length) {
          this.userInfo = res.result.data[0]
        }
      })
    },
    formatTime (data) {
      data.forEach(item => {
        item.date = formatTime(new Date(item.date).getTime())
      })
      return data
    },
    loadMore () {
      this.loading = true
      this.fetch('getGoods', {
        page: this.page++,
        num: this.num,
        uid: this.uid
      }).then(res => {
        console.log(res)
        let data = res.result.data
        this.total = res.result.count
        this.loading = false
        if (data.length) {
          data = this.formatTime(data)
          this.goodsData.push(...data)
          console.log(this.goodsData)
        } else {
          this.hasMore = false
        }
      }).catch(res => {
        this.loading = false
        console.log('err', res)
      })
    }
  }
}
</script>
<style>
.card-user {
	padding: 10rpx 0rpx;
}
.card-user .u-card {
	margin: 20rpx;
}
.u-card .content>p:first-child{
	margin-bottom: 10rpx;
}
.u-footer{
	padding-top: 0!important;
}
.user-home>.title{
	text-align: center;
	line-height: 1.5;
	font-size: 30rpx;
	color: #666;
}
</style>
