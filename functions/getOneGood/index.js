// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let { _id } = event
    let goods = await db.collection('goods')
    .where({
      _id
    }).get()
    let good = goods.data[0]
    let user = await db.collection('user')
      .where({
        _id: good.uid
      }).field({
        avatarUrl: true,
        nickName: true,
        number: true,
        _id: true
      }).get()
    good.user = user.data[0]
    let classify = await db.collection('classify')
      .where({
        _id: good.cid
      }).field({
        name: true,
        _id: true
      }).get()
    good.classify = classify.data[0]
    return good
  } catch (e) {
    return e
  }
}