const express = require('express');

const app = express();

app.use(express.json())


const errorHandler = app.use((error, request, response, next) => {
  response.status(500).json({ error: 'Something went wrong' })
})

module.exports = { errorHandler }
