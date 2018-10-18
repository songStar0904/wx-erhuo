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
      number,
      _id
    } = event
    let cid = classify._id
    let date = new Date().getTime()
    if (event._id) {
      let good = await db.collection('goods').where({_id}).field({uid: true}).get()
      if (good.data[0].uid === openId) {
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
            address,
            number
          }
        })
      } else {
        return {
          code: 400,
          errMsg: '你没有权限！'
        }
      }
      
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
          address,
          number
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}