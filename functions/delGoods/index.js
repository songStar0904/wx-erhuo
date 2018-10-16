// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  let {_id} = event
  try {
    let goods = await db.collection('goods')
      .where({
        _id
      }).get()
    let good = goods.data[0]
    await cloud.deleteFile({
      fileList: good.icon,
    })
    return await db.collection('goods').where({
      _id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}