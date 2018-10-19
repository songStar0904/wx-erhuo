// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let { avatarUrl, address, nickName, number, gender, sign, school } = event
    let _id = event.userInfo.openId
    let hasUser = await db.collection('user').where({
      _id // 填入当前用户 openid
    }).count()
    if (hasUser.total > 0) {
      return await db.collection('user').where({
          _id
        }).update({
          // data 传入需要局部更新的数据
          data: { avatarUrl, address, nickName, number, gender, sign, school }
        })
    } else {
      return await db.collection('user').add({
        data: {
          _id, avatarUrl, address, nickName, number, gender, sign
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}