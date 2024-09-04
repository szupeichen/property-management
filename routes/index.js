const express = require('express')
const router = express.Router()

const auth = require('../routes/modules/auth')
const users = require('../routes/modules/users')
const units = require('../routes/modules/units')

const unitController = require('../controllers/unit-controller')

const { authenticator } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/auth', auth)
router.use('/users', users)
router.use('/units', units)
router.use('/', generalErrorHandler)

router.get('/getAgencyDetail', unitController.getAgencyDetail)
router.get('/unitsFilterByAgency', unitController.unitsFilterByAgency)
router.get('/', authenticator, unitController.unitsAll)

module.exports = router
