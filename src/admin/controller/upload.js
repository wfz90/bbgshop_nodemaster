const Base = require('./base.js');
const fs = require('fs');
const qiniu = require('qiniu')

const accessKey = think.config('qiniu.accessKey')
const secretKey = think.config('qiniu.secretKey')
const bucketName = think.config('qiniu.bucketName')

module.exports = class extends Base {
  async tokenAction() {
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    var options = {
        "scope": bucketName
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken=putPolicy.uploadToken(mac);
      console.log(uploadToken);
        return this.success({
            uploadToken:uploadToken
        })
    }

};
