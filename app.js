const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access') // 解決handlebars因為改善資安漏洞的denied access property
const handlebarsHelpers = require('./helpers/handlebars-helpers') // handlebars-helpers
const { getUser } = require('./helpers/auth-helpers') // auth-helpers

const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// 只有在本地開發環境下運行時才載入 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT

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
const passport = require('./config/passport')
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

const router = require('./routes/index')
app.use(router)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`)
})
