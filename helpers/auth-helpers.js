module.exports = {
  getUser: req => {
    return req.user || null
  },
  getId: req => {
    return req.params.id || null
  },
  // 處理前端各欄位值以符合後端資料庫格式
  dataTransfer: (status, income, annualIncome) => {
    const statusBoolean = (status === 'on')
    const incomeInt = parseInt(income, 10)
    const annualIncomeInt = parseInt(annualIncome, 10)
    return {
      statusBoolean,
      incomeInt,
      annualIncomeInt
    }
  },
  // 偵測unit中的已出租有無勾選
  ifCheckedBox: data => {
    if (data.status === true) {
      return true
    } else {
      return false
    }
  },
  rememberEmail: (req, res, next) => {
    const session = req.session
    if (req.body.rememberUser === 'on') {
      session.savedEmail = req.body.email || ''
    }
    return next()
  }
}
