const { Router } = require('express')

const Product = require('./../models/product')

const router = Router()

router.get('/api/products', async (req, res) => {
  const products = await Product.find({})
  res.send(products)
})

module.exports = router