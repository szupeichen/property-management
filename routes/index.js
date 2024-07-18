const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const userController = require('../controllers/user-controller')
const unitController = require('../controllers/unit-controller')
const auth = require('../routes/modules/auth')
const { authenticator } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')
const { rememberEmail } = require('../helpers/auth-helpers')

router.get('/auth', auth)
router.get('/users/register', userController.registerPage)
router.post('/users/register', userController.register)
router.get('/users/login', userController.loginPage)
router.post('/users/login', rememberEmail, passport.authenticate('local', {
  failureRedirect: '/users/login', failureFlash: true
}), userController.login)

router.get('/users/logout', userController.logout)

router.get('/units/new', authenticator, unitController.unitsCreatePage)
router.get('/units/delete', authenticator, unitController.unitsDeletePage)
router.get('/units/:id/edit', authenticator, unitController.unitsEditPage)
router.post('/units/new', authenticator, unitController.unitsCreate)
router.delete('/units', authenticator, unitController.unitsDelete)
router.get('/units/:id', authenticator, unitController.unitsId)
router.put('/units/:id', authenticator, unitController.unitsEdit)
router.get('/getAgencyDetail', unitController.getAgencyDetail)
router.get('/', authenticator, unitController.unitsAll)
router.use('/', generalErrorHandler)

module.exports = router
