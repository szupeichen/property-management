const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controller')
const unitController = require('../controllers/unit-controller')
const { authenticator } = require('../middleware/auth')

router.get('/users/register', userController.registerPage)
router.post('/users/register', userController.register)
router.get('/units/:id/edit', authenticator, unitController.unitsEdit)
router.get('/units/:id', authenticator, unitController.unitsId)
router.get('/', authenticator, unitController.unitsAll)

module.exports = router
