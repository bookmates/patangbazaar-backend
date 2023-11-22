const mongoose = require('mongoose')

const Category = require('../models/category')


const getAllCategories = async()=>{
  try{
    const categories = await Category.find({})
    return categories
  }catch(error){
    throw error
  }
}

const getCategoryById = async(id)=>{
  try{
    const category = await Category.findById(id)
    return category
  }catch(error){
    throw error
  }
}

module.exports = {
  getAllCategories,
  getCategoryById
}