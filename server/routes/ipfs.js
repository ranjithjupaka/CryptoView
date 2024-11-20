const express = require('express')
const { storeData, retrieveData, listMongoDBData } = require('../controllers/ipfsController')


const router = express.Router()

router.post('/store', storeData)
router.get('/retrieve/:hash', retrieveData)
router.get('/list', listMongoDBData)


module.exports = router
