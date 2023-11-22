const express = require('express');
const app = express();
app.use(express.json())

const {
  getUserCart,
  addToCart,
  deleteFromCart,
  updateBookQuantity
} = require('../queries/cart.queries')

const cartRouter = express.Router()

cartRouter.get('/', async (request, response) => {
  try {
    const { userId } = request.user
    const cart = await getUserCart(userId)
    response.status(200).json({ success: true, cart })
  } catch (error) {
    response.status(500).json({ success: false, error: error.message })
  }
})

cartRouter.post('/', async (request, response) => {
  try {
    const { userId } = request.user
    const { bookId } = request.body
    const cart = await addToCart(userId, bookId)
    response.status(200).json({ success: true, cart })
  } catch (error) {
    response.status(500).json({ success: false, error: error.message })
  }
})

cartRouter.delete('/:bookId', async (request, response) => {
  try {
    const { userId } = request.user
    const { bookId } = request.params
    const cart = await deleteFromCart(userId, bookId)
    response.status(200).json({ success: true, cart })
  } catch (error) {
    response.status(500).json({ success: false, error: error.message })
  }
})

cartRouter.post('/:bookId', async (request, response) => {
  try {
    const { userId } = request.user
    const { bookId } = request.params
    const { action } = request.body
    const cart = await updateBookQuantity(bookId,userId,action)
    response.status(200).json({ success: true, cart })
  } catch (error) {
    response.status(500).json({ success: false, error: error.message })
  }

})

module.exports = cartRouter