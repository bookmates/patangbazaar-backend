const mongoose = require('mongoose')
const Book = require('../models/book')

const userSchema = new mongoose.Schema({
firstName: {
    type: String,
    required: true
  },
  lastName:{
    type:String,
    required:true
  }
  ,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePictureUrl: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: Number,
  cart:[{
    book:{
       type:mongoose.Schema.Types.ObjectId,
  ref:'Book'
    },
    quantity:{
       type:Number
    }
  }],
  wishlist:[{
       type:mongoose.Schema.Types.ObjectId,
  ref:'Book'
    }
  ]
  
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User