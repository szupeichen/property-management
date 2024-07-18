const express = require('express')
const router = express.Router()

const passport = require('passport')
const userController = require('../../controllers/user-controller')
const { rememberEmail } = require('../../helpers/auth-helpers')

router.get('/register', userController.registerPage)
router.post('/register', userController.register)
router.get('/login', userController.loginPage)
router.post('/login', rememberEmail, passport.authenticate('local', {
  failureRedirect: '/users/login', failureFlash: true
}), userController.login)
router.get('/logout', userController.logout)

module.exports = router
