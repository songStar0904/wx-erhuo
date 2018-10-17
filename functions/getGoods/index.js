// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let {
      page = 1, num = 4, order = 'date', orderType = 'desc', uid, type = ''
    } = event
    let openId = event.userInfo.openId
    if (type === 'want') {
      let want = await db.collection('love')
        .where({
          uid: openId
        })
        .orderBy(order, orderType)
        .field({
          gid: true
        }).get()
      let goods = []
      for (let i = 0; i < want.data.length; i++) {
        let good = await db.collection('goods').where({
          _id: want.data[i].gid
        }).get()
        goods.push(good.data[0])
      }
      return goods
    } else {
      let goods = db.collection('goods')
        .orderBy(order, orderType)
        .limit(num)
        .skip(page * num)
      if (uid && uid == openId) {
        goods.where({
          uid
        })
      }
      return await goods.get()
    }

  } catch (e) {
    return e
  }
}