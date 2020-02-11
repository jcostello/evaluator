const request = require('supertest');
const app = require('../../app');

const User = require('./../../models/user')
const userFactory = require('../../../test/factories/usersFactory')

let userData

describe ('GET /api/users/sign_in', () => {

  beforeEach(async() => {
    userData = userFactory.build()

    await User.create(userData)
  })

  it('returns the user if exist and matches the credential', async () => {
    const response = await request(app)
      .post('/api/users/sign_in')
      .send({ email: userData.email })
    
    expect(response.status).toBe(200)

    expect(response.body.email).toBe(userData.email.toLowerCase())
    expect(response.body.token).toBeDefined()
  })
})
