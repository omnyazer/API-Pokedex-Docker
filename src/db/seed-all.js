const mongoose = require('./mongoose')
const { createFirstUser } = require('./create-first-user')
const { seedPokemons } = require('./seed-pokemons')

const seedAll = async () => {
  await createFirstUser()
  await seedPokemons()
}

if (require.main === module) {
  seedAll().finally(() => mongoose.connection.close())
}

module.exports = { seedAll }

