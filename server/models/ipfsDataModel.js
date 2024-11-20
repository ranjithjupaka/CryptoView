const mongoose = require('mongoose')
const { Schema } = mongoose

const IpfsDataSchema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('IpfsData', IpfsDataSchema)
