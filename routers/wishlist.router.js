const express = require('express');
const app = express();
app.use(express.json())

const {
  getUserWishlist,
  addToWishlist,
  deleteFromWishlist,
} = require('../queries/wishlist.queries')

const wishlistRouter = express.Router()

wishlistRouter.get('/', async (request, response) => {
  try {
    const { userId } = request.user
    const wishlist = await getUserWishlist(userId)
    response.status(200).json({ success: true, wishlist })
  } catch (error) {
    response.status(500).json({ success: false, error: error.message })
  }
})

wishlistRouter.post('/', async (request, response) => {
  try {
    const { userId } = request.user
    const { bookId } = request.body
    const wishlist = await addToWishlist(userId, bookId)
    response.status(200).json({ success: true, wishlist })
  } catch (error) {
    response.status(500).json({ success: false, error: error.message })
  }
})

wishlistRouter.delete('/:bookId', async (request, response) => {
  try {
    const { userId } = request.user
    const { bookId } = request.params
    const wishlist = await deleteFromWishlist(userId, bookId)
    response.status(200).json({ success: true, wishlist })
  } catch (error) {
    response.status(500).json({ success: false, error: error.message })
  }
})


module.exports = wishlistRouter