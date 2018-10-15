// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let { gid } = event
    let uid = event.userInfo.openId
    let hasLove = await db.collection('love').where({
      uid, // 填入当前用户 openid
      gid
    }).count()
    if (hasLove.total) {
      return await db.collection('love').where({
        gid, uid
      }).remove()
    } else {
      let date = new Date().getTime()
      return await db.collection('love').add({
        data: {
          gid, uid, date
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}