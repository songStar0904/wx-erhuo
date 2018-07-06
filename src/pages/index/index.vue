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
    <goods-list :goodsData="goodsData" :hasMore="hasMore"></goods-list>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import fetch from '@/utils/fetch'
import goodsList from '@/components/goodsList'
export default {
  data () {
    return {
      swipers: [{
        url: '/static/images/swiper_1.png'
      }, {
        url: '/static/images/swiper_2.png'
      }, {
        url: '/static/images/swiper_3.png'
      }],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      hasMore: true,
      page: 1,
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

      wx.showLoading({ title: '拼命加载中...' })
      return fetch('goods/get', {
        page: this.page++,
        num: this.num
      }).then(r => {
        let data = r.data.data
        if (data.length) {
          data = this.formatTime(data)
          this.goodsData.push(...data)
        } else {
          this.hasMore = false
        }
        wx.hideLoading()
      }).catch(e => {
        console.error(e)
        wx.hideLoading()
      })
    },
    formatTime (data) {
      data.forEach(item => {
        item.goods_time = formatTime(item.goods_time)
      })
      return data
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
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
    this.page = 1
    this.loadMore()
      .then(() => wx.stopPullDownRefresh())
  },
  onReachBottom () {
    this.loadMore()
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.init()
  }
}
</script>

<style scoped>
.col-12 {
  width: 50%;
}
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
