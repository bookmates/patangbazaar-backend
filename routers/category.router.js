const express = require('express');
const app = express();
app.use(express.json())

const {
  getAllCategories,
  getCategoryById
} = require('../queries/category.queries')

const categoryRouter = express.Router()



categoryRouter.get('/' , async(request ,response)=>{
  try{
    const categories = await getAllCategories()
    response.status(200).json({
      success: true,
      categories
    })
  }catch(error){
    response.status(500).json({success:false , error:error.message})
  }
})

categoryRouter.get('/:categoryId' , (request , response)=>{
  try{
    const {categoryId} = request.params
    const category = getCategoryById(categoryId)
    response.status(200).json({
      success: true,
      category
    })
  
  }catch(error){
    response.status(500).json({success:false , error:error.message})
  }
})


module.exports = categoryRouter