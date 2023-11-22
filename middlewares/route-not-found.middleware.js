const express = require('express');

const app = express();

app.use(express.json())


const routeNotFound = app.use((request, response) => {
  response.status(404).json({ error: 'Route not found' })
})

module.exports = { routeNotFound }