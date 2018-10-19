<template>
  <button class="login-btn" open-type="getUserInfo" @getuserinfo="onGetUserInfo" type="ghost" :long="true"></button>
</template>
<script>
export default {
  created () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }
  }
}
</script>

<style>
@import url('./style/common.css');
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.login-btn{
  position: fixed;
  bottom: 0;
}
</style>
