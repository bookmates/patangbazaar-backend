const mongoose = require('mongoose')
const User = require('../models/user')
const Book = require('../models/book')

const getUserWishlist = async (userId) => {
  try {
    const user = await User.findById(userId).populate({
      path: 'wishlist',
      select: '_id img name author price originalPrice isBestSeller category rating'
    })
    return user.wishlist
  } catch (error) {
    throw error
  }
}

const addToWishlist = async (userId, bookId) => {
  try {
    const user = await User.findById(userId)
    const book = await Book.findById(bookId)
    user.wishlist.push(book)
    await user.save()
    const result = await User.findById(userId).populate({
      path: 'wishlist',
      select: '_id img name author price originalPrice isBestSeller category rating'
    })
    return result.wishlist
  } catch (error) {
    throw error
  }
}

const deleteFromWishlist = async (userId, bookId) => {
  try {
    const user = await User.findById(userId).populate({
      path: 'wishlist',
      select: '_id img name author price originalPrice isBestSeller category rating'
    })
    const updatedWishlist = user.wishlist.filter(item => item._id.toString() !== bookId.toString())
    user.wishlist = updatedWishlist

    await user.save()
    const result = await User.findById(userId).populate({
      path: 'wishlist',
      select: '_id img name author price originalPrice isBestSeller category rating'
    })
    return result.wishlist
  } catch (error) {
    throw error
  }
}



module.exports = {
  getUserWishlist,
  addToWishlist,
  deleteFromWishlist,
}