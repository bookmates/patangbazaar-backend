const mongoose = require('mongoose')
const Category = require('../models/category.js')

const bookSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
 author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  isBestSeller: {
    type: Boolean,
    required: true
  },
category: {
    type:String,
  required:true
  }
  ,
  rating: {
    type: Number,
    required: true
  }
})


const Book = mongoose.model('Book' , bookSchema)

module.exports = Book