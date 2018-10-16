// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let {page = 1, num = 4, order = 'date', orderType = 'desc', uid} = event
    let goods = db.collection('goods')
      .orderBy('date', 'desc')
      .limit(num)
      .skip(page * num)
    if (uid) {
      goods.where({
        uid
      })
    }
    return await goods.get()
  } catch (e) {
    return e
  }
}