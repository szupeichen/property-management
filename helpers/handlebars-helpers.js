const dayjs = require('dayjs') // 載入 dayjs 套件

module.exports = {
  currentYear: () => dayjs().year(), // 取得當年年份作為 currentYear 的屬性值
  formatDate: (date) => dayjs(date).format('YYYY-MM-DD'),
  annualIncome: (income) => { return income * 12 } // 計算年租金
}
