const express = require('express')
const { addDetails, getDetails, updateDetails, getDetailsWithId, searchUser } = require('../controller/cricketController')
const router = express.Router()

router.post('/add-details', addDetails)
router.get('/get-details', getDetails)
router.get('/user-details/:id', getDetailsWithId)
router.put('/update-details/:id', updateDetails)
router.get('/users', searchUser)

module.exports = router