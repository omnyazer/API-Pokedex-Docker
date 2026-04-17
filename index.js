const express = require('express')
const bodyParser = require('body-parser')
require('./src/db/mongoose')
const { createFirstUser } = require('./src/db/create-first-user')
const { userLogin } = require('./src/routes/user-route')
const { authMdlr } = require('./src/middlewares/auth')
const {
  findAllPokemons,
  findPokemonByPk,
  createPokemon,
  updatePokemon,
  deletePokemon
} = require('./src/routes/pokemon-route')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

createFirstUser()

app.post('/api/login', userLogin)
app.use(authMdlr)

app.get('/api/pokemons', findAllPokemons)
app.get('/api/pokemons/:id', findPokemonByPk)
app.post('/api/pokemons', createPokemon)
app.put('/api/pokemons/:id', updatePokemon)
app.delete('/api/pokemons/:id', deletePokemon)

app.use((req, res) => res.status(404).json({ message: 'notfound' }))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
