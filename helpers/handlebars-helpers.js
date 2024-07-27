const dayjs = require('dayjs') // 載入 dayjs 套件

module.exports = {
  // 取得當年年份作為 footer.hbs currentYear 的值
  currentYear: () => dayjs().year(),
  // 格式化租約起訖日
  formatDate: (date) => dayjs(date).format('YYYY-MM-DD')
}
