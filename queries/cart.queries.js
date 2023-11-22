const mongoose = require('mongoose')
const User = require('../models/user')
const Book = require('../models/book')

const getUserCart = async (userId) => {
  try {
    const user = await User.findById(userId).populate({
      path: 'cart',
      populate: {
        path: 'book',
        select: '_id img name author price originalPrice isBestSeller category rating'
      }
    })
    return user.cart
  } catch (error) {
    throw error
  }
}

const addToCart = async (userId, bookId) => {
  try {
    const user = await User.findById(userId)
    const book = await Book.findById(bookId)
    user.cart.push({ book, quantity: 1 })
    await user.save()
    const result = await User.findById(userId).populate({
      path: 'cart',
      populate: {
        path: 'book',
        select: '_id img name author price originalPrice isBestSeller category rating'
      }

    })
    return result.cart
  } catch (error) {
    throw error
  }
}

const deleteFromCart = async (userId, bookId) => {
  try {
    const user = await User.findById(userId).populate({
      path: 'cart',
      populate: {
        path: 'book',
        select: '_id img name author price originalPrice isBestSeller category rating'
      }
    })
    const updatedCart = user.cart.filter(item => item.book._id.toString() !== bookId.toString())

    user.cart = updatedCart
    await user.save()
    const result = await User.findById(userId).populate({
      path: 'cart',
      populate: {
        path: 'book',
        select: '_id img name author price originalPrice isBestSeller category rating'
      }
    })
    return result.cart
  } catch (error) {
    throw error
  }
}


const updateBookQuantity = async (bookId, userId, action) => {
  try {
    const user = await User.findById(userId).populate({
      path: 'cart',
      populate: {
        path: 'book',
        select: '_id img name author price originalPrice isBestSeller category rating'
      }
    })

    const updatedCart = user.cart.reduce(((acc, curr) => {
      if (curr.book._id.toString() === bookId.toString()) {
        if (action.type === 'increment') {
          return [...acc, { ...curr, quantity: curr.quantity + 1 }]
        } else if (action.type === 'decrement') {
          return [...acc, { ...curr, quantity: curr.quantity - 1 }]
        }
      } else {
        return [...acc, curr]
      }
    }), [])
    user.cart = updatedCart
    console.log(updatedCart, 'updatedcart')
    await user.save()
    return user.cart
  } catch (error) {
    throw error
  }
}

module.exports = {
  getUserCart,
  addToCart,
  deleteFromCart,
  updateBookQuantity
}