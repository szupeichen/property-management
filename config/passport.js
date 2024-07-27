const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

// set up Passport strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  async (req, email, password, cb) => {
    try {
      if (!email.trim() || !password.trim()) {
        throw new Error('請輸入帳號及密碼！')
      }
      const user = await User.findOne({ where: { email } })
      if (!user) { return cb(null, false, req.flash('warning_msg', '帳號或密碼輸入錯誤！')) }
      const res = await bcrypt.compare(password, user.password)
      if (!res) { return cb(null, false, req.flash('warning_msg', '帳號或密碼輸入錯誤！')) }
      return cb(null, user)
    } catch (err) {
      console.log('查詢用戶時出錯(at passport.js):', err)
    }
  }))

// Facebook login setting
passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
  async (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    try {
      const user = await User.findOne({ where: { email } })
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(randomPassword, salt)
      const newUser = await User.create({
        name,
        email,
        password: hash
      })
      done(null, newUser)
    } catch (err) {
      done(err, false)
    }
  }))
// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser(async (id, cb) => {
  const user = await User.findByPk(id)
  return cb(null, user)
})
module.exports = passport
