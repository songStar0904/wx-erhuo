// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let {
      name,
      price,
      oprice,
      detail,
      classify,
      icon,
      userInfo: {
        openId
      },
      school,
      address,
      _id
    } = event
    let cid = classify._id
    let date = new Date().getTime()
    if (event._id) {
      return await db.collection('goods').doc(event._id).update({
        // data 传入需要局部更新的数据
        data: {
          name,
          price,
          oprice,
          detail,
          cid,
          icon,
          school,
          address
        }
      })
    } else {
      return await db.collection('goods').add({
        data: {
          name,
          price,
          oprice,
          detail,
          cid,
          uid: openId,
          icon,
          date,
          school,
          address
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}