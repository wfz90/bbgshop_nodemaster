module.exports = [{
  interval: '300s',
  // immediate: false,
  immediate: true,
  handle: '/admin/crontab/test'
}, {
  cron: '0 */1 * * *',
  handle: '/admin/crontab/test',
  type: 'one'
}]
