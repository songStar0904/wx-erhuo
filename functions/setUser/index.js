// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let { avatarUrl, address, nickName, number, gender, sign } = event
    let hasUser = await db.collection('user').where({
      _openid: event.userInfo.openId // 填入当前用户 openid
    }).count()
    if (event._id || hasUser) {
      return await db.collection('user').doc(event._id).update({
        // data 传入需要局部更新的数据
        data: { avatarUrl, address, nickName, number, gender, sign }
      })
    } else {
      return await db.collection('user').add({
        data: {
          avatarUrl, address, nickName, number, gender, sign,
          _openid: event.userInfo.openId
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}