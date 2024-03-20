const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
// 解決handlebars因為改善資安漏洞的denied access property
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
// handlebars-helpers
const handlebarsHelpers = require('./helpers/handlebars-helpers')
// auth-helpers
const { getUser } = require('./helpers/auth-helpers')
// 掛載 auth
const { authenticator } = require('../todo-sequelize2/middleware/auth')

const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')

const router = require('./routes/index')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT

const db = require('./models')
const Agency = db.Agency
const Unit = db.Unit
const User = db.User

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars), helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true })) // body-parser
app.use(methodOverride('_method'))

// 初始化 Passport 及 啟動處理session功能
app.use(passport.initialize())
app.use(passport.session())

// setting flash-message
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = getUser(req)
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(router)
// API
// login
app.get('/users/login', (req, res) => {
  const session = req.session
  if (session.savedEmail !== '') {
    res.render('login', { email: session.savedEmail })
  } else {
    res.render('login')
  }
})
app.post('/users/login', passport.authenticate('local', {
  failureRedirect: '/users/login', failureFlash: true
}), function (req, res) {
  const session = req.session
  if (req.body.rememberUser === 'on') {
    session.savedEmail = req.user.email || ''
  }
  req.flash('success_messages', '成功登入！')
  res.redirect('/')
})

// register
// app.get('/users/register', (req, res) => {
//   res.render('register')
// })
// app.post('/users/register', (req, res) => {
//   const { name, email, password, confirmPassword } = req.body
//   User.findOne({ where: { email } }).then(user => {
//     if (user) {
//       console.log('User already exists')
//       return res.render('register', {
//         name,
//         email,
//         password,
//         confirmPassword
//       })
//     }
//     return bcrypt
//       .genSalt(10)
//       .then(salt => bcrypt.hash(password, salt))
//       .then(hash => User.create({
//         name,
//         email,
//         password: hash
//       }))
//       .then(() => res.redirect('/'))
//       .catch(err => console.log(err))
//   })
// })


// logout
app.get('/users/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

// read
app.get('/units/:id', (req, res) => {
  const id = req.params.id
  return Unit.findByPk(id, {
    include: [Agency]
  })
    .then(unit => res.render('detail', { units: unit.toJSON() }))
    .catch(error => console.log(error))
})

app.get('/units/:id/edit', (req, res) => {
  res.render('detail')
})

app.get('/', authenticator, (req, res) => {
  return Unit.findAll({
    raw: true,
    nest: true,
    include: [Agency]
  })
    .then((units) => { return res.render('index', { units }) })
    .catch((error) => { return res.status(422).json(error) })
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`)
})
