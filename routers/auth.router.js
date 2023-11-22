const express = require('express');
const app = express();
app.use(express.json())

const {
  signup,
  login
} = require('../queries/user.queries.js')

const authRouter = express.Router()

authRouter.post('/signup', async (request, response) => {
  try {
    const getSignupData = await signup(request.body)
    if (getSignupData === 409) {
      response.status(409).json({ error: 'Email already registered' })
    } else {
      response.json({ message: 'New user created', createdUser: getSignupData.createdUser, encodedToken: getSignupData.token })
    }

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

authRouter.post('/login', async (request, response) => {
  try {
    const getLoginData = await login(request.body)
    if (getLoginData === 404) {
      response.status(404).json({ error: 'User Not Found' })
    } else {
      if (getLoginData === 401) {
        response.status(401).json({ error: 'Incorrect Password' })
      } else {
        response.json({ message: 'User logged in', user: getLoginData.foundUser, encodedToken: getLoginData.token })
      }
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})



module.exports = authRouter