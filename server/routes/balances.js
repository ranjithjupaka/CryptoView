const express = require('express')
const { getTokenBalance } = require('../controllers/balancesController.js')

const router = express.Router()

router.get('/token-balance', getTokenBalance)

module.exports = router
