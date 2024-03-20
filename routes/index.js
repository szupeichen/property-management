const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controller')

router.get('/users/register', userController.registerPage)
router.post('/users/register', userController.register)


router.get('/', (req, res) => {
  res.render('login')
})

module.exports = router
