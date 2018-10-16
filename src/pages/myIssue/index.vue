<template>
  <div class="my-issue">
    <i-tabs :current="current" color="#19be6b" @change="changeTab">
    	<i-tab key="said" title="在架宝贝">
  		</i-tab>
  		<i-tab key="nosaid" title="下架宝贝"></i-tab>
  	</i-tabs>
  	<block v-if="!hasData">
  	    <no-data title="暂无数据" :action="{title: '现在去发布', url: '/pages/issue/main'}" ></no-data>
  	</block>
  	<div v-else>
  		<goods-list2 :goodsData="goodsData" @delGoods="showDel"></goods-list2>
        <i-load-more :tip="loading ? '玩命加载中' : '暂无数据'" :loading="loading" />
  	</div>
    <i-message id="message" />
    <i-modal title="删除确认" :visible="isShowDel" :actions="delAction" @iclick="delGoods">
	    <span>删除后无法恢复哦</span>
	</i-modal>
  </div>
</template>
<script>
import { formatTime } from '@/utils/index'
import goodsList2 from '@/components/goodsList2'
import noData from '@/components/noData'
export default {
  data () {
    return {
      current: 'said',
      page: 0,
      num: 5,
      uid: null,
      loading: false,
      goodsData: [],
      hasData: true,
      delAction: [{
        name: '取消'
      }, {
        name: '删除',
        color: '#ed3f14',
        loading: false
      }],
      delId: null,
      isShowDel: false
    }
  },
  onShow () {
    this.uid = wx.getStorageSync('userInfo')._id
    this.loadMore()
  },
  onReachBottom () {
    this.loadMore()
  },
  components: {
    goodsList2,
    noData
  },
  watch: {
    goodsData (val) {
      this.hasData = val.length > 0
    }
  },
  methods: {
    init () {
      this.goodsData = []
      this.hasMore = true
      this.page = 0
      this.loadMore()
    },
    changeTab ({target: {key}}) {
      this.current = key
    },
    showDel (id) {
      this.delId = id
      this.isShowDel = true
    },
    delGoods ({target: {index}}) {
      if (index === 0) {
        this.isShowDel = false
      } else if (index === 1) {
        let that = this
        that.delAction[1].loading = true
        wx.cloud.callFunction({
          // 云函数名称
          name: 'delGoods',
          // 传给云函数的参数
          data: {
            _id: that.delId
          }
        }).then(res => {
          console.log(res)
          that.delAction[1].loading = false
          this.isShowDel = false
          wx.showToast({
            title: '删除成功!'
          })
          that.init()
        }).catch(e => {
          that.delAction[1].loading = false
          console.error(e)
        })
      }
    },
    formatTime (data) {
      data.forEach(item => {
        item.date = formatTime(new Date(item.date).getTime())
      })
      return data
    },
    loadMore () {
      this.loading = true
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getGoods',
        // 传给云函数的参数
        data: {
          page: this.page++,
          num: this.num,
          uid: this.uid
        }
      }).then(res => {
        let data = res.result.data
        console.log(res)
        this.loading = false
        if (data.length) {
          data = this.formatTime(data)
          this.goodsData.push(...data)
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
<style scoped>
</style>
