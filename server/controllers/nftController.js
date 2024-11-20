const nftDataModel = require('../models/nftDataModel')
const ERC721_ABI = require('../utils/erc721_abi')
const { Web3 } = require('web3')
require('dotenv').config()

const getNFTData = async (req, res) => {
  try {
    const { contractAddress, tokenId } = req.body
    console.log(contractAddress, tokenId)

    const web3Provider = new Web3.providers.HttpProvider(process.env.NODE_URL)
    const web3 = new Web3(web3Provider)

    const nftContract = new web3.eth.Contract(ERC721_ABI, contractAddress)

    const tokenURI = await nftContract.methods.tokenURI(tokenId).call()
    console.log(tokenURI)

    const tokenURL = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')

    const response = await fetch(tokenURL)
    const resp = await response.json()

    const imageURL = resp.image.replace('ipfs://', 'https://ipfs.io/ipfs/')

    const content = {
      name: resp.name,
      description: resp.description,
      image: imageURL,
    }

    console.log('content', content)

    const storedData = await nftDataModel
      .find({ name: content.name })
      .sort({ timestamp: -1 })

    if (storedData.length > 0) {
      return res.status(200).json({
        success: true,
        data: storedData,
      })
    } else {
      const nftData = new nftDataModel(content)

      await nftData.save()

      res.status(200).json({
        success: true,
        content,
      })
    }
  } catch (error) {
    console.error('Error retrieving content:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve content',
    })
  }
}

const listNFTData = async (req, res) => {
  try {
    const storedData = await nftDataModel.find({}).sort({ timestamp: -1 })

    res.status(200).json({
      success: true,
      data: storedData,
    })
  } catch (error) {
    console.error('Error listing stored nft data:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve stored nft data',
    })
  }
}

module.exports = { getNFTData, listNFTData }
