const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  }
})

productSchema.set('toJSON', {
  virtuals: true
});

const Product = mongoose.model('Product', productSchema)

module.exports = Product