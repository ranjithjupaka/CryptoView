const { default: axios } = require('axios')
const ipfsDataModel = require('../models/ipfsDataModel')

const listMongoDBData = async (req, res) => {
  try {
    const storedData = await ipfsDataModel.find({}).sort({ timestamp: -1 })

    res.status(200).json({
      success: true,
      data: storedData,
    })
  } catch (error) {
    console.error('Error listing stored hashes:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve stored hashes',
    })
  }
}

const storeData = async (req, res) => {
  const { description, hash } = req.body

  if (!hash) {
    return res.status(400).json({ error: 'ipfs hash is required' })
  }

  try {
    const ipfsData = new ipfsDataModel({
      hash,
      description: description || '',
    })

    await ipfsData.save()

    res.status(201).json({
      success: true,
      hash,
      message: 'Content successfully stored on IPFS',
    })
  } catch (error) {
    console.error('Error storing content:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to store content',
    })
  }
}

const retrieveData = async (req, res) => {
  const { hash } = req.params
  // https://ipfs.io/ipfs/QmXn9N1VCotpykz9s6YKs24miLHSyhMCEXBLPLua6znean
  try {
    const resp = await fetch(`https://ipfs.io/ipfs/${hash}`)
    const content = await resp.text()
    console.log('content', content)

    res.status(200).json({
      success: true,
      content,
    })
  } catch (error) {
    console.error('Error retrieving content:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve content',
    })
  }
}

module.exports = { listMongoDBData, storeData, retrieveData }
