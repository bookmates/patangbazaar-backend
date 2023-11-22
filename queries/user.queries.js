const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.APP_JWT_SECRET || 'budhiyakebaalkaalehai'
const bcrypt = require('bcrypt')



const signup = async (userDetails) => {
  try {
    const isRegistered = await User.findOne({ email: userDetails.email })
    if (!isRegistered) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userDetails.password, salt)
      const newUser = new User({ ...userDetails, password: hashedPassword , cart:[] })
      const createdUser = await newUser.save()
      const token = jwt.sign({ id: createdUser.id }, JWT_SECRET, { expiresIn: '24h' })
      return { createdUser, token }
    } else {
      return 409
    }
  } catch (error) {
    throw error
  }
}

const login = async (userDetails) => {
  try {
    const foundUser = await User.findOne({ email: userDetails.email })
    if (foundUser) {
      const checkPassword = await bcrypt.compare(userDetails.password, foundUser.password)
      if (checkPassword) {
        const token = jwt.sign({ id: foundUser.id }, JWT_SECRET, { expiresIn: '24h' })
        return { foundUser, token }
      } else {
        return 401
      }
    } else {
      return 404
    }

  } catch (error) {
    throw error
  }
}

const changePassword = async (userDetails, userId) => {
  try {
    const { currentPassword, newPassword } = userDetails
    const foundUser = await User.findById(userId)
    if (foundUser) {
      const checkPassword = await bcrypt.compare(userDetails.currentPassword, foundUser.password)

      if (checkPassword) {
        foundUser.password = newPassword
        const updatedUser = await foundUser.save()
        return updatedUser
      } else {
        return 401
      }
    } else {
      return 404
    }

  } catch (error) {
    throw error
  }
}

const updateProfilePicture = async (userDetails, userId) => {
  try {
    const { newProfilePictureUrl } = userDetails
    const foundUser = await User.findById(userId)
    if (foundUser) {
      foundUser.profilePictureUrl = newProfilePictureUrl
      const updatedUser = await foundUser.save()
      return updatedUser
    } else {
      return null
    }

  } catch (error) {
    throw error
  }
}

const updateContactDetails = async (userId, userDetails) => {
  try {
    const foundUser = await User.findById(userId)
    if (foundUser) {
      Object.assign(foundUser, userDetails)
      const updatedUser = await foundUser.save()
      return updatedUser
    } else {
      return null
    }

  } catch (error) {
    throw error
  }
}

 


module.exports = {
  signup,
  login,
  changePassword,
  updateProfilePicture,
  updateContactDetails
}