const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/createUser', UserController.createUser)
router.post('/updateUser', UserController.updateUser)
router.post('/deleteUser', UserController.deleteUser)
router.get('/view', UserController.viewUser)



module.exports = router