const express = require('express')
const { getNFTData, listNFTData } = require('../controllers/nftController.js')

const router = express.Router()

router.get('/nft-data', getNFTData)
router.get('/list', listNFTData)

module.exports = router
