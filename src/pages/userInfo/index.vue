<template>
  <div>
    <form @submit="formSubmit">
      <div class="user-base-info" @click="uploadAvatarUrl">
        <image class="avatar" :src="userInfo.avatarUrl" name="avatarUrl" mode="aspectFill"></image>
        <div>点击修改头像</div>
      </div>
    <i-cell-group>
      <i-cell title="昵称">
        <div slot="footer"><input :value="userInfo.nickName" name="nickName"></input></div>
      </i-cell>
      <i-cell title="性别">
        <div slot="footer">
          <i-radio-group :current="userGender" @change="changeGender" i-class="flex" name="gender">
            <i-radio v-for="(item, index) in gender" :key="index" :value="item.name" :checked="item.id === userInfo.gender" color="#19be6b"></i-radio>
          </i-radio-group>
        </div>
      </i-cell>
      <i-cell title="个性签名">
        <div slot="footer"><input :value="userInfo.sign" name="sign" placeholder="写写主要卖什么"></input></div>
      </i-cell>
      <i-cell title="联系电话">
        <div slot="footer"><input :value="userInfo.number" name="number" placeholder="方便买家联系你哦"></input></div>
      </i-cell>
      <i-cell title="学校" is-link :value="userInfo.school ? userInfo.school.name : '选择学校'" @iclick="showSchool">
      </i-cell>
      <i-cell title="宿舍区（地址)">
        <div slot="footer"><input :value="userInfo.address" name="address" placeholder="二货的取货地址啦"></input></div>
      </i-cell>
    </i-cell-group>
    <div class="footer">
      <i-button type="success" long>保存</i-button>
      <!-- i-button 还未支持formType="submit" 用button做临时处理覆盖到i-button上-->
      <button formType="submit" style="height: 88rpx;position: absolute; top: 0;left: 0;right: 0;opacity: 0"></button>
    </div>
    </form>
    <i-action-sheet :visible="isShowSchool" show-cancel @cancel="closeSchool" @iclick="changeSchool">
    <view slot="header" style="color: #333;padding: 32rpx;">
        选择学校
    </view>
  	    <!-- 数据多后使用 -->
		<i-index slot="content" >
			<i-index-item v-for="(item, index) in school" :key="index" :name="item.key">
				<div v-for="(s, i) in item.list" :key="i" @click="changeSchool(s)" class="school-item">
					{{s.name}}
				</div>
			</i-index-item>
		</i-index>
	</i-action-sheet>
	<i-toast id="toast" />
  </div>
</template>
<script>
import {getCloudPath} from '@/utils/index.js'
import WxValidate from '../../../static/utils/validate.js'
import { $Toast } from '../../../static/iview/base/index'
export default {
  data () {
    return {
      isShowSchool: false,
      school: [],
      userInfo: {
        avatarUrl: '/static/images/user-unlogin.png',
        nickName: '点击获得用户名',
        number: '',
        gender: 1,
        sign: '',
        address: '',
        _id: 0,
        school: {}
      },
      gender: [{
        id: 1,
        name: '男'
      }, {
        id: 0,
        name: '女'
      }],
      rules: {
        avatarUrl: {
          required: true
        },
        nickName: {
          required: true,
          maxLength: 11
        },
        gender: {
          required: true
        },
        number: {
          tel: true
        }
      },
      msgs: {
        avatarUrl: {
          required: '亲， 你的头像呢？'
        },
        nickName: {
          required: '给自己取个响亮的名字',
          maxLength: '名字不能超过11个字符！'
        },
        gender: {
          required: '请选择性别！'
        },
        number: {
          tel: '请输入正确的手机号！'
        }
      }
    }
  },
  computed: {
    userGender () {
      return this.userInfo.gender === 1 ? '男' : '女'
    }
  },
  mounted () {
    this.validate = new WxValidate(this.rules, this.msgs)
    this.userInfo = wx.getStorageSync('userInfo')
    console.log('sss', wx.getStorageSync('userInfo'))
  },
  methods: {
    showSchool () {
      console.log(this.school)
      if (this.school.length > 0) {
        this.isShowSchool = true
      } else {
        this.fetch('getSchool').then(res => {
          console.log(res)
          this.isShowSchool = true
          this.school = res.result.data
          console.log(this.school)
        }).catch(res => {
          console.log('error' + res)
        })
      }
    },
    closeSchool () {
      this.isShowSchool = false
    },
    changeSchool (school) {
      this.userInfo.school = school
      this.closeSchool()
    },
    changeGender ({target: {value}}) {
      this.userInfo.gender = value === '男' ? 1 : 0
    },
    setUserInfo (userInfo) {
      this.fetch('setUser', userInfo).then(res => {
        console.log(res)
        if (res.result.stats.updated > 0) {
          $Toast({
            type: 'success',
            content: '保存成功'
          })
          wx.setStorageSync('userInfo', userInfo)
        } else {
          $Toast({
            type: 'error',
            content: '保存失败'
          })
        }
      })
    },
    uploadAvatarUrl () {
      let that = this
      wx.chooseImage({
        count: 1,
        success (res) {
          if (res.errMsg === 'chooseImage:ok') {
            let cloudPath = getCloudPath('user', that.userInfo._id)
            console.log(res.tempFilePaths, cloudPath)
            wx.cloud.uploadFile({
              cloudPath,
              filePath: res.tempFilePaths[0]
            }).then(r => {
              that.userInfo.avatarUrl = r.fileID
              that.setUserInfo(that.userInfo)
            }).catch(e => {
              console.log(e)
            })
          }
        }
      })
    },
    formSubmit ({target: {value}}) {
      value.avatarUrl = this.userInfo.avatarUrl
      value.gender = this.userInfo.gender
      value.school = this.userInfo.school
      if (!this.validate.checkForm(value)) {
        const error = this.validate.errorList[0]
        $Toast({
          content: error.msg
        })
      } else {
        this.setUserInfo(value)
      }
    }
  }
}
</script>
<style>
.user-base-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: 300rpx;
}

.user-base-info:after {
  border-radius: 0;
  border: none;
}

.user-base-info>.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.user-base-info>div {
  margin-top: 20rpx;
  font-size: 30rpx;
  color: #333;
}
.school-item{
	font-size: 30rpx;
	padding: 20rpx 40rpx;
}

</style>
