const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

const extractToken = (authorizationValue) => {
  if (!authorizationValue) return null
  if (authorizationValue.startsWith('Bearer ')) {
    return authorizationValue.slice(7)
  }
  return authorizationValue
}

const authMdlr = (req, res, next) => {
  const authorizationHeader =
    req.headers.authorization ||
    req.query.Authorization ||
    req.query.authorization

  const token = extractToken(authorizationHeader)

  if (!token) {
    const message = "Vous n'avez pas fourni de jeton d'authentification."
    return res.status(401).json({ message })
  }

  return jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message = "l'utilisateur n'est pas autorisé à accéder à cette ressource."
      return res.status(401).json({ message, data: error.message })
    }

    const userId = decodedToken.userId
    const requestUserId = req.body && req.body.userId

    if (requestUserId && requestUserId !== userId) {
      const message = "L'identifiant de l'utilisateur est invalide."
      return res.status(401).json({ message })
    }

    req.auth = { userId }
    return next()
  })
}

module.exports = { authMdlr }
