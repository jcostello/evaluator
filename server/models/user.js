const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error('Email is invalid')
      }
    }
  },

  token: {
    type: String,
  }
})

userSchema.methods.generateJWT = async function() {
  const user = this
  const token = jwt.sign({id: user.id.toString()}, process.env.SECRET)

  user.token = token
  await user.save()

  return token
}


userSchema.set('toJSON', {
  virtuals: true
});

const User = mongoose.model('User', userSchema)

module.exports = User
