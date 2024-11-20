const mongoose = require('mongoose')
const { Schema } = mongoose

const NFTDataSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('NFTDataSchema', NFTDataSchema)
