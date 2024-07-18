const express = require('express')
const router = express.Router()

const unitController = require('../controllers/unit-controller')
const auth = require('../routes/modules/auth')
const users = require('../routes/modules/users')
const { authenticator } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/auth', auth)
router.use('/users', users)

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
