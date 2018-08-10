// default config
module.exports = {
  // port: 8364, //易天端口
  default_module: 'api',
  weixin: {
    // 以下为
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

  vaptcha:{ //人机行为验证 Vaptcha localhost:9080 本地测试
    vid:'',
    key:''
  },
  qiniu: {
    accessKey: '', // 七牛提供的公钥
    secretKey: '', // 七牛提供的私钥
    bucketName: ''// 存储空间名
  },

  SMSClient:{ //阿里云通信基础能力业务短信发送
    accessKeyId: '',
    secretAccessKey: '',
    SignatureName: '',
    TemplateDomesticCode: '',//国内短信code
    TemplateAbroadCode: '',//国际短信code
  },
};
