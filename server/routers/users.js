const { Router } = require('express')

const User = require('./../models/user')

const router = Router()

router.post('/api/users/sign_in', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(404).send();
  }

  await user.generateJWT()

  res.send(user)
})

module.exports = router
