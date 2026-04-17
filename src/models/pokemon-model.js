const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PokemonSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: String,
  hp: Number,
  cp: Number,
  picture: String,
  types: [String],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Pokemon', PokemonSchema)
