const express = require('express');
const app = express();
app.use(express.json())

const bookRouter = express.Router()

const {
  getAllBooks,
  getBookById
} = require('../queries/book.queries')


bookRouter.get('/', async (request, response) => {
  try {
    const books = await getAllBooks()
    response.status(200).json({ success: true, books })
  } catch (error) {
    response.status(500).json({ success: false, message: error.message })
  }
})

bookRouter.get('/:bookId', async (request, response) => {
  try {
    const book = await getBookById(request.params.bookId)
    response.status(200).json({ success: true, book })
  } catch (error) {
    response.status(500).json({ success: false, message: error.message })
  }
})

module.exports = bookRouter