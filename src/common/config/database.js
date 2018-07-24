const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  // database: 'ytshop',//易天的数据库
  database: 'bbgshop',//贝堡的数据库
  prefix: 'bbgshop_',
  encoding: 'utf8mb4',
  //以下为服务器本地数据
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  dateStrings: true
};
