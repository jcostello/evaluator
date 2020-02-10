const express = require('express')
const mongoose = require('./config/db')

const app = express();

const productsRouter = require('./routers/products')

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect()
}

app.use(express.json())
app.use(productsRouter)

module.exports = app;
