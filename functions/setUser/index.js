// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let { avatarUrl, address, nickName, number } = event
    if (event._id) {
      return await db.collection('user').doc(event._id).update({
        // data 传入需要局部更新的数据
        data: { avatarUrl, address, nickName, number }
      })
    } else {
      return await db.collection('user').add({
        data: {
          avatarUrl, address, nickName, number,
          _openid: event.userInfo.openId
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}