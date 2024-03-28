module.exports = {
  getUser: req => {
    return req.user || null
  },
  rememberEmail: (req, res, next) => {
    const session = req.session
    if (req.body.rememberUser === 'on') {
      session.savedEmail = req.body.email || ''
    }
    return next()
  }
}
