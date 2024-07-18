const express = require('express')
const router = express.Router()

const unitController = require('../../controllers/unit-controller')
const { authenticator } = require('../../middleware/auth')

router.use('/', authenticator)

router.get('/new', unitController.unitsCreatePage)
router.get('/delete', unitController.unitsDeletePage)
router.get('/:id/edit', unitController.unitsEditPage)
router.post('/new', unitController.unitsCreate)
router.delete('/', unitController.unitsDelete)
router.get('/:id', unitController.unitsId)
router.put('/:id', unitController.unitsEdit)

module.exports = router
