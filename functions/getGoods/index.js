// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let {page, num} = event
    return await db.collection('goods')
      .orderBy('date', 'desc')
      .limit(num)
      .skip(page * num).get()
  } catch (e) {
    return e
  }
}