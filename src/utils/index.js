import schoolData from './school.js'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (timestamp) {
  // 补全为13位
  var arrTimestamp = (timestamp + '').split('')
  for (var start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = '0'
    }
  }
  timestamp = arrTimestamp.join('') * 1

  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  // var halfamonth = day * 15
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - timestamp

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
    return '不久前'
  }
  // 计算差异时间的量级
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute

  // 数值补0方法
  var zero = function (value) {
    if (value < 10) {
      return '0' + value
    }
    return value
  }

  // 使用
  if (monthC > 12) {
    // 超过1年，直接显示年月日
    return (function () {
      var date = new Date(timestamp)
      return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日'
    })()
  } else if (monthC >= 1) {
    return parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    return parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    return parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    return parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    return parseInt(minC) + '分钟前'
  }
  return '刚刚'
}
export function formatSchool (sid) {
  for (let val in schoolData) {
    for (let i = 0; i < schoolData[val].length; i++) {
      if (sid === Number(schoolData[val][i].id)) {
        return schoolData[val][i].name
      }
    }
  }
  return sid
}
export function getCloudPath (val, id) {
  if (val === 'goods') {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${val}/${year}${month > 9 ? month : `0${month}`}${day > 9 ? day : `0${day}`}/${date.getTime()}.png`
  } else if (val === 'user' && id) {
    return `${val}/${id}.png`
  }
}
export function formatPrice (value) {
  return parseFloat(isNaN(value) ? 0 : value).toFixed(2)
}
export function getSchool (val) {
}
export function isLogin () {
  // return wx.getStorageSync('userInfo') ? true : false
}
export default {
  formatNumber,
  formatTime,
  formatSchool,
  getCloudPath,
  getSchool,
  formatPrice,
  isLogin
}
