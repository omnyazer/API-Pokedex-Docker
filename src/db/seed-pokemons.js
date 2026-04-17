const mongoose = require('./mongoose')
const Pokemon = require('../models/pokemon-model')

const pokemonsToSeed = [
  {
    id: 1,
    name: 'Bulbizarre',
    hp: 25,
    cp: 5,
    picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
    types: ['Plante', 'Poison']
  },
  {
    id: 2,
    name: 'Salameche',
    hp: 28,
    cp: 6,
    picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
    types: ['Feu']
  },
  {
    id: 3,
    name: 'Carapuce',
    hp: 21,
    cp: 4,
    picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
    types: ['Eau']
  }
]

const seedPokemons = async () => {
  try {
    await mongoose.connection.asPromise()

    const operations = pokemonsToSeed.map((pokemon) => ({
      updateOne: {
        filter: { id: pokemon.id },
        update: { $set: pokemon },
        upsert: true
      }
    }))

    await Pokemon.bulkWrite(operations)
    console.log(`Seed pokemons OK: ${pokemonsToSeed.length} enregistrements`)
  } catch (error) {
    console.error('Erreur seed pokemons:', error.message)
  }
}

if (require.main === module) {
  seedPokemons().finally(() => mongoose.connection.close())
}

module.exports = { seedPokemons }

