const express = require('express');

const app = express();

const userRouter = express.Router()


const {
  changePassword,
  updateProfilePicture,
  updateContactDetails
} = require('../queries/user.queries.js')


userRouter.post('/:userId/password', async (request, response) => {
  try {
    const userId = request.params.userId
    const getUpdatedUser = await changePassword(request.body, userId)
    if (getUpdatedUser === 404) {
      response.status(404).json({ error: 'User not found' })
    } else {
      if (getUpdatedUser === 401) {
        response.status(401).json({ error: 'Incorrect Current Password' })
      } else {
        response.json({ message: 'Password changed for the user', user: getUpdatedUser })
      }
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

userRouter.post('/:userId/profilePicture', async (request, response) => {
  try {
    const userId = request.params.userId
    const updatedUser = await updateProfilePicture(request.body, userId)
    if (updatedUser) {
      response.json({ message: 'Profile Picture updated for the user', user: updatedUser })
    } else {
      response.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

userRouter.post('/:userId/contact', async (request, response) => {
  try {
    const userId = request.params.userId
    const updatedUser = await updateContactDetails(userId, request.body)
    if (updatedUser) {
      response.json({ message: 'Contact details updated for the user', user: updatedUser })
    } else {
      response.status(404).json({ error: 'User not found' })
    }

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})


module.exports = userRouter
