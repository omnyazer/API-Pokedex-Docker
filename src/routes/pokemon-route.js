const Pokemon = require('../models/pokemon-model')
const mongoose = require('mongoose')

const getPokemonFilter = (idParam) => {
  if (/^\d+$/.test(idParam)) {
    return { id: Number(idParam) }
  }

  if (mongoose.isValidObjectId(idParam)) {
    return { _id: idParam }
  }

  return null
}

const findAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find().sort({ id: 1 })
    res.json({ message: pokemons })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const findPokemonByPk = async (req, res) => {
  try {
    const filter = getPokemonFilter(req.params.id)

    if (!filter) {
      return res.status(400).json({ message: 'invalid pokemon id' })
    }

    const pokemon = await Pokemon.findOne(filter)

    if (!pokemon) {
      return res.status(404).json({ message: 'pokemon not found' })
    }

    return res.json({ message: pokemon })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createPokemon = async (req, res) => {
  try {
    const payload = { ...req.body }

    if (payload.id === undefined || payload.id === null) {
      const lastPokemon = await Pokemon.findOne().sort({ id: -1 })
      payload.id = lastPokemon ? lastPokemon.id + 1 : 1
    }

    const pokemon = await Pokemon.create(payload)
    return res.status(201).json({ 'new pokemon': pokemon })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const updatePokemon = async (req, res) => {
  try {
    const filter = getPokemonFilter(req.params.id)

    if (!filter) {
      return res.status(400).json({ message: 'invalid pokemon id' })
    }

    const pokemon = await Pokemon.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true
    })

    if (!pokemon) {
      return res.status(404).json({ message: 'pokemon not found' })
    }

    return res.json({ 'pokemon maj': pokemon })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const deletePokemon = async (req, res) => {
  try {
    const filter = getPokemonFilter(req.params.id)

    if (!filter) {
      return res.status(400).json({ message: 'invalid pokemon id' })
    }

    const pokemon = await Pokemon.findOneAndDelete(filter)

    if (!pokemon) {
      return res.status(404).json({ message: 'pokemon not found' })
    }

    return res.json({ 'this pokemon is deleted': pokemon })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  findAllPokemons,
  findPokemonByPk,
  createPokemon,
  updatePokemon,
  deletePokemon
}

