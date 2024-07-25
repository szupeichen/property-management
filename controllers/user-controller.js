const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

const userController = {
  registerPage: (req, res) => {
    res.render('register')
  },
  register: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ where: { email } }).then(user => {
      if (user) {
        req.flash('warning_msg', '該用戶名已存在')
        console.log('User already exists')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => {
          req.flash('success_msg', '您已經成功註冊！請重新登入。')
          console.log('User successfully created!')
          res.redirect('/users/login')
        })
        .catch(err => console.log(err))
    })
  },
  loginPage: (req, res) => {
    const session = req.session
    if (session.savedEmail !== '') {
      res.render('login', { email: session.savedEmail })
    } else {
      res.render('login')
    }
  },
  login: (req, res) => {
    req.flash('success_msg', '您已經成功登入！')
    res.redirect('/')
  },
  logout: (req, res) => {
    req.logout()
    req.flash('success_msg', '您已經成功登出。')
    res.redirect('/users/login')
  }
}
module.exports = userController
