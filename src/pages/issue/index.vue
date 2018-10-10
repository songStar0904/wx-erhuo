<template>
  <div class="issue-wrap">
  	<i-notice-bar icon="systemprompt" closable>
	    {{notice}}
	</i-notice-bar>
	<form @submit="formSubmit" report-submit>
		<div class="upload" :class="goods.icon.length > 0 ? 'has-upload' : 'no-upload'">
			<div class="add-icon" @click="chooseIcon">
				<i-icon type="camera" size="30" color="#333" />
			    <div>上传图片</div>
			</div>
			<scroll-view scroll-x class="icon-wrap" v-if="goods.icon.length > 0">
			<block v-for="(item, index) in goods.icon" :key="index">
				<div class="icon-box">
					<div class="close" @click="delIcon(index)">
						<i-icon type="close" size="12" color="#fff"/>
					</div>
					<div class="default" v-if="index === 0">封面</div>
					<img :src="item" alt="" @click="selectDefault(index)">
				</div>
			</block>
			</scroll-view>
			</div>
	    <div class="space-h"></div>
	    <div class="goods-info">
	    	<div class="goods-name">
	    	    <i-input  :value="goods.name" @change="changeName" name="name" placeholder="为二货取个诱人的名字吧~" :maxlength="maxlength"/>
	    	    <span class="max-length">{{odd}}</span>
	    	</div>
	    	<div class="goods-price">
	    		<i-input  :value="goods.price" @change="changePrice" name="price" type="number"title="现价" maxlength="10"/>
	    		<i-input :value="goods.oprice" @change="changeOprice" name="oprice" type="number"title="原价" maxlength="10"></i-input>
	    	</div>
	    	<textarea class="goods-detail" :value="goods.detail" @input="changeDetail" placeholder="在此描述你的二货。如：品牌，规格，成色等信息。" />
	    </div>
	    <div class="space-h"></div>
	    <i-cell-group>
		    <i-cell title="分类" is-link :value="goods.classify ? goods.classify.name : '选择分类'" @iclick="showClassify"></i-cell>
		    <i-cell title="地址" is-link :value="goods.address ? goods.address.name : '选择地址'" @iclick="showClassify"></i-cell>
		    <!-- <i-cell title="价格" is-link :value="goods.price ? goods.price : '开价'" only-tap-footer="true"></i-cell> -->
		</i-cell-group>
	    <div class="issue fixed-footer">
	      <i-button long="true" type="success" >发布</i-button>
	      <!-- i-button 还未支持formType="submit" 用button做临时处理覆盖到i-button上-->
	      <button formType="submit" style="height: 88rpx;position: absolute; top: 0;left: 0;right: 0;opacity: 0"></button>
	    </div>
	</form>
	<i-action-sheet :visible="isShowClassify" show-cancel @cancel="closeClassify" @iclick="changeClassify" :actions="classify"></i-action-sheet>
	<i-toast id="toast" />
	<i-message id="message" />
  </div>
</template>

<script>
import {getCloudPath} from '@/utils/index.js'
import WxValidate from '../../../static/utils/validate.js'
import { $Toast, $Message } from '../../../static/iview/base/index'
export default {
  data () {
    return {
      notice: '禁止发布虚假信息和危害社会安全信息。',
      goods: {
        name: '',
        uid: '',
        price: null,
        oprice: null,
        icon: [],
        detail: '',
        classify: null
      },
      classify: [],
      maxlength: 20,
      isShowClassify: false,
      isShowPrice: false,
      rules: {
        name: {
          required: true,
          maxlength: 20
        },
        price: {
          required: true,
          number: true
        },
        oprice: {
          required: true,
          number: true
        },
        detail: {
          required: true
        },
        classify: {
          required: true
        },
        icon: {
          required: true
        }
      },
      msgs: {
        name: {
          required: '请输入二货名称',
          maxlength: '二货名称不得超过20'
        },
        price: {
          required: '请输入现价',
          number: '请输入数字'
        },
        oprice: {
          required: '请输入原价',
          number: '请输入数字'
        },
        icon: {
          required: '请上传二货图片'
        },
        classify: {
          required: '请选择分类'
        },
        detail: {
          required: '好的描述更容易卖出去哦~'
        }
      },
      validate: null
    }
  },
  computed: {
    odd () {
      return this.maxlength - this.goods.name.length
    }
  },
  mounted () {
    this.validate = new WxValidate(this.rules, this.msgs)
  },
  onShow () {
    if (wx.getStorageSync('goods')) {
      this.goods = wx.getStorageSync('goods')
    }
  },
  onHide () {
    wx.setStorageSync('goods', this.goods)
  },
  methods: {
    chooseIcon () {
      let that = this
      wx.chooseImage({
        success (res) {
          if (res.errMsg === 'chooseImage:ok') {
            let cloudPath = getCloudPath('goods')
            console.log(res.tempFilePaths, cloudPath)
            wx.cloud.uploadFile({
              cloudPath,
              filePath: res.tempFilePaths[0]
            }).then(r => {
              that.goods.icon.push(r.fileID)
            }).catch(e => {
              console.log(e)
            })
            // wx.cloud.callFunction({
            //   // 云函数名称
            //   name: 'upload',
            //   data: {
            //     cloudPath,
            //     fileContent: res.tempFilePaths
            //   }
            // }).then(r => {
            //   console.log(r)
            //   that.goods.icon.push(r.result.fileID)
            // }).catch(res => {
            //   console.log(res)
            // })
          }
        },
        error (err) {
          console.log(err)
        }
      })
    },
    delIcon (index) {
      let {icon} = JSON.parse(JSON.stringify(this.goods))
      let fileIDs = icon.splice(index, 1)
      wx.cloud.callFunction({
        name: 'delUpload',
        data: {
          fileIDs
        }
      }).then(res => {
        console.log(res)
        this.goods.icon = icon
      })
    },
    selectDefault (index) {
      let {icon} = this.goods
      let flag = icon.splice(index, 1)
      icon.unshift(flag)
      this.goods.icon = icon
    },
    changeName ({target: {detail: {value}}}) {
      this.goods.name = value
    },
    changeDetail ({target: {value}}) {
      this.goods.detail = value
    },
    changePrice ({target: {detail: {value}}}) {
      console.log(value)
      this.goods.price = value
    },
    changeOprice ({target: {detail: {value}}}) {
      this.goods.oprice = value
    },
    showClassify () {
      if (this.classify.length > 0) {
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
      console.log(e, this.goods.detail)
      let data = this.goods
      // 传入表单数据，调用验证方法
      if (!this.validate.checkForm(data)) {
        const error = this.validate.errorList[0]
        $Toast({
          content: error.msg
        })
      } else {
        wx.cloud.callFunction({
          name: 'setGoods',
          data
        }).then(res => {
          console.log(res)
          if (res.result.errMsg === 'collection.add:ok') {
            $Message({
              content: '发布成功！',
              type: 'success'
            })
          } else {
            $Message({
              content: '发布失败，请重新发布！',
              type: 'error'
            })
          }
        })
      }
    }
  }
}
</script>

<style>
.issue-wrap{
}
.upload{
    height: 200rpx;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	font-size: 28rpx;
	color: #333;
}
.upload.no-upload{
	align-items: center;
	justify-content: center;
}
.upload.has-upload{
	overflow: hidden;
}
.upload.has-upload .icon-box, .upload .add-icon{
	width: 120rpx;
	height: 120rpx;
}
.upload.has-upload .icon-box{
	position: relative;
	margin-left: 20rpx;
}
.upload.has-upload .icon-box>img{
	width: 100%;
	height: 100%;
}
.upload.has-upload .icon-box>.close{
	position: absolute;
	right: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 26rpx;
	height: 26rpx;
	background: rgba(0, 0, 0, 0.6);
}
.upload.has-upload .icon-box>.default{
	width: 100%;
	height: 30rpx;
	position: absolute;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	background: #f76a24;
	opacity: 0.6;
	font-size: 26rpx;
}
.upload .add-icon{
	width: 150rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	padding-top: 16rpx;
}
.upload>.icon-wrap{
	flex-grow: 1;
}
.upload.has-upload .add-icon{
	/*background: #eee;*/
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
