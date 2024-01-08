const getUser = req => {
  //  如果有req.user就傳回，不然就空值
  return req.user || null
}
module.exports = {
  getUser
}
