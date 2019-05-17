// 云函数入口文件
const cloud = require('wx-server-sdk')
var WXBizDataCrypt = require('./WXBizDataCrypt')
var request = require('request');
var rp = require('request-promise-native');
cloud.init()

// 云函数入口函数

var appId = 'wx4f4bc4dec97d474b'
var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
var encryptedData =
  'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
  'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
  '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
  '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
  'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
  'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
  '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
  'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
  '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
  '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
  'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
  '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
  '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
  'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
  'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
  '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
  'Db/XcxxmK01EpqOyuxINew=='
var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData, iv)

console.log('解密后 data: ', data)
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  console.log(11111)
  let key = await rp(`https://api.weixin.qq.com/sns/jscode2session?appid=${event.userInfo.appId}&secret=493fc3e190098784ebac680c659043ba&js_code=${event.code}&grant_type=authorization_code`);
  key=JSON.parse(key)
  console.log(11233,key)
  try {
    return await db.collection('sessionKey').doc(key.openid).set({
      data: {
        sessionKey: key.session_key
      }
    })
  } catch (e) {
    console.error(e)
  }
}