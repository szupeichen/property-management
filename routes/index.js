const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const userController = require('../controllers/user-controller')
const unitController = require('../controllers/unit-controller')
const { authenticator } = require('../middleware/auth')
const { rememberEmail } = require('../helpers/auth-helpers')

router.get('/users/register', userController.registerPage)
router.post('/users/register', userController.register)
router.get('/users/login', userController.loginPage)
router.post('/users/login', rememberEmail, passport.authenticate('local', {
  failureRedirect: '/users/login', failureFlash: true
}), userController.login)
router.get('/users/logout', userController.logout)
router.get('/units/:id/edit', authenticator, unitController.unitsEdit)
router.get('/units/:id', authenticator, unitController.unitsId)
router.get('/', authenticator, unitController.unitsAll)

module.exports = router