const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'bbgshop',
  prefix: 'bbgshop_',
  encoding: 'utf8mb4',
  host: '',
  port: '',
  user: '',
  password: '',
  dateStrings: true
};
