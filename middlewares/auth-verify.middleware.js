const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.APP_JWT_SECRET || 'budhiyakebaalkaalehai'

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

function extractUserIDFromToken(decodedToken) {
  if (decodedToken && decodedToken.id) {
    return decodedToken.id
  } else {
    throw new Error('Invalid or missing user ID in token')
  }
}

function authVerify(req, res, next) {
  const token = req.headers.authorization
  try {
    const decoded = verifyToken(token)
    const userId = extractUserIDFromToken(decoded)
    req.user = { userId }
    return next()
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unauthorised access, please add the token' })
  }
}

module.exports = { authVerify }