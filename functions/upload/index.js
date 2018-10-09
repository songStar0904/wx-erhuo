// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数

exports.main = async(event, context) => {
  let {
    cloudPath,
    fileContent
  } = event
  await cloud.uploadFile({
    cloudPath,
    fileContent: fileContent[0]
  }).then(res => {
    const result = await cloud.getTempFileURL({
      fileList: res.requestID,
    })
    return result
  })
}