const mongoose = require('mongoose')

// const mongoURI = process.env.MONGODB
const mongoURI = "mongodb+srv://jaipurkites:jaipurkites@cluster0.sallb8m.mongodb.net/jaipurkites"

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })