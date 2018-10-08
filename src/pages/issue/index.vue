<template>
  <div class="issue-wrap">
  	<i-notice-bar icon="systemprompt" closable>
	    {{notice}}
	</i-notice-bar>
	<form bindsubmit="formSubmit">
		<div class="upload" name="icon">
			<div class="has-upload" v-show="goods.icon"></div>
			<div class="no-upload" v-show="!goods.icon">
				<i-icon type="camera" size="30" color="#333" />
				<div>点击上传图片</div>
			</div>
	    </div>
	    <div class="space-h"></div>
	    <div class="goods-info">
	    	<div class="goods-name">
	    	    <i-input  :value="goods.name" @change="changeName" name="name" placeholder="为二货取个有人的名字吧~" :maxlength="maxlength"/>
	    	    <span class="max-length">{{odd}}</span>
	    	</div>
	    	<div class="goods-price">
	    		<i-input  :value="goods.price" @change="changePrice" name="price" type="number"title="现价" maxlength="10"/>
	    		<i-input :value="goods.oprice" @change="changeOprice" name="oprice" type="number"title="原价" maxlength="10"></i-input>
	    	</div>
	    	<textarea class="goods-detail" :value="goods.detail" placeholder="在此描述你的二货。如：品牌，规格，成色等信息。" />
	    </div>
	    <div class="space-h"></div>
	    <i-cell-group>
		    <i-cell title="分类" is-link :value="goods.classify ? goods.classify.name : '选择分类'" @iclick="showClassify"></i-cell>
		    <i-cell title="地址" is-link :value="goods.address ? goods.address.name : '选择地址'" @iclick="showClassify"></i-cell>
		    <!-- <i-cell title="价格" is-link :value="goods.price ? goods.price : '开价'" only-tap-footer="true"></i-cell> -->
		</i-cell-group>
	    <div class="issue fixed-footer">
	      <i-button long="true" type="success">发布</i-button>
	    </div>
	</form>
	<i-action-sheet :visible="isShowClassify" show-cancel @cancel="closeClassify" @iclick="changeClassify" :actions="classify"></i-action-sheet>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notice: '禁止发布虚假信息和危害社会安全信息。',
      goods: {
        name: '',
        uid: '',
        price: null,
        oprice: null,
        icon: '',
        detail: '',
        classify: null
      },
      classify: [{
        name: '书籍'
      }, {
        name: '电器'
      }],
      maxlength: 20,
      isShowClassify: false,
      isShowPrice: false
    }
  },
  watch: {},
  computed: {
    odd () {
      return this.maxlength - this.goods.name.length
    }
  },
  methods: {
    changeName ({target: {detail: {value}}}) {
      this.goods.name = value
    },
    changePrice ({target: {detail: {value}}}) {
      console.log(value)
      this.goods.price = value
    },
    changeOprice ({target: {detail: {value}}}) {
      this.goods.oprice = value
    },
    showClassify () {
      if (this.classify) {
        this.isShowClassify = true
      } else {
        wx.cloud.callFunction({
          // 云函数名称
          name: 'getClassify'
        }).then(res => {
          this.isShowClassify = true
          this.classify = res.result.data
        }).catch(res => {
          console.log('error' + res)
        })
      }
    },
    closeClassify () {
      this.isShowClassify = false
    },
    changeClassify ({target: {index}}) {
      this.goods.classify = this.classify[index]
      this.closeClassify()
    },
    formSubmit (e) {
      console.log(e)
    }
  }
}
</script>

<style>
.issue-wrap{
}
.upload{
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.upload>.no-upload{
	text-align: center;
	font-size: 28rpx;
	color: #333;
}
.goods-name{
	display: flex;
	align-items: center;
	position: relative;
	border-bottom: 1rpx solid #eee;
}
.goods-name>.max-length{
	position: absolute;
	right: 30rpx;
	font-size: 26rpx;
	color: #666;
}
.goods-price{
	display: flex;
}
.goods-detail{
	width: 100%;
	height: 200rpx;
	border: none;
	box-sizing: border-box;
	padding: 30rpx;
	font-size: 28rpx;
}
.textarea-placeholder{
	font-size: 28rpx;
}
</style>
