<template>
  <div>
    <swiper :indicator-dots="indicatorDots"
      :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#fff" style="height: 350rpx;">
      <block v-for="(item, index) in swipers" :key="index">
        <swiper-item>
          <image :src="item.url" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
    <goods-list :goodsData="goodsData"></goods-list>
    <i-load-more :tip="loading ? '玩命加载中' : '暂无数据'" :loading="loading" />
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import goodsList from '@/components/goodsList'
export default {
  data () {
    return {
      swipers: [{
        url: '/static/images/swiper_1.png'
      }],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      hasMore: true,
      loading: false,
      page: 0,
      num: 8,
      goodsData: [],
      userInfo: {}
    }
  },
  components: {
    goodsList
  },
  methods: {
    init () {
      this.loadMore()
    },
    loadMore () {
      if (!this.hasMore) return
      this.loading = true
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getGoods',
        // 传给云函数的参数
        data: {
          page: this.page++,
          num: this.num
        }
      }).then(res => {
        let data = res.result.data
        console.log(res.result)
        this.loading = false
        wx.stopPullDownRefresh()
        if (data.length) {
          data = this.formatTime(data)
          this.goodsData.push(...data)
        } else {
          this.hasMore = false
        }
      }).catch(res => {
        this.loading = false
        console.log(res)
      })
    },
    formatTime (data) {
      data.forEach(item => {
        item.date = formatTime(new Date(item.date).getTime())
      })
      return data
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    this.goodsData = []
    this.hasMore = true
    this.page = 0
    this.loadMore()
  },
  onReachBottom () {
    this.loadMore()
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.init()
  },
  Onshow () {
    this.init()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
