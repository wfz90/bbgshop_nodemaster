// default config
module.exports = {
  // port: 8364, //易天端口
  default_module: 'api',
  weixin: {
    appid: '', // 小程序 appid
    secret: '', // 小程序密钥
    mch_id: '', // 商户帐号ID
    partner_key: '', // 微信支付密钥
    notify_url: '' // 微信异步通知，
  },
  express: {
  // 快递物流信息查询使用的是快递鸟接口，申请地址：http://www.kdniao.com/
  appid: '', // 对应快递鸟用户后台 用户ID
  appkey: '', // 对应快递鸟用户后台 API key
  request_url: ''
},


  vaptcha:{  // bbgshop.com 贝堡商城线上环境
    vid:'',
    key:''
  },
  // vaptcha:{ //人机行为验证 Vaptcha localhost:9080 本地测试
  //   vid:'',
  //   key:''
  // },
  SMSClient:{ //阿里云通信基础能力业务短信发送
    accessKeyId: '',
    secretAccessKey: '',
    queueName: ''
  },
  qiniu: {
    accessKey: '',//七牛上传的公钥
    secretKey: '',//七牛上传的私钥
    bucketName: '',//七牛上传的储存空间名
  }
};
