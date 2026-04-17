const bcrypt = require('bcrypt')
const mongoose = require('./mongoose')
const User = require('../models/user-model')

const createFirstUser = async () => {
  const username = 'pikachu'
  const plainPassword = 'pikachu'

  try {
    await mongoose.connection.asPromise()

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      console.log(`Utilisateur "${username}" déjà présent`)
      return
    }

    const hash = await bcrypt.hash(plainPassword, 10)
    const user = await User.create({ username, password: hash })
    console.log(`Création du premier utilisateur OK: ${user.username}`)
  } catch (error) {
    console.error('Erreur lors de la création du premier utilisateur:', error.message)
  }
}

if (require.main === module) {
  createFirstUser().finally(() => mongoose.connection.close())
}

module.exports = { createFirstUser }

