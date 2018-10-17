// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let { gid } = event
  let uid = event.userInfo.openId
  try {
    return await db.collection('love').where({
      gid,
      uid
    }).remove()
  } catch (e) {
    console.error(e)
  }
}