require('dotenv').config({ quiet: true })
const mongoose = require('mongoose')

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pokemon-api-rest'
const dbName = process.env.DB_NAME || 'pokemon-api-rest'

mongoose
  .connect(mongoUri, { dbName })
  .then(() => {
    console.log('MongoDB connection OK')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message)
  })

module.exports = mongoose
