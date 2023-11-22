const mongoose = require('mongoose')
const Book = require('../models/book')


const getAllBooks = async () => {
  try{
  const books = await Book.find({})
  return books
  }catch(error){
    throw error
  }
}

const getBookById = async (id) => {
  try{
  const book = await Book.findById(id)
  return book
  }catch(error){
    throw error
  }
}

module.exports = {
  getAllBooks,
  getBookById  ,
  
}