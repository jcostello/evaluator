const request = require('supertest');
const app = require('../../app');

const Product = require('../../models/product')
const productFactory = require('../../../test/factories/productFactory')

let products

describe('GET /api/products', () => {
  beforeEach(async () => {
    products = await Product.create(productFactory.buildList(3).concat(
      productFactory.build({name: 'Test Product'})
    ))
  })

  it('return all the products', async () => {
    const response = await request(app)
      .get('/api/products')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(products.length)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Test Product'
        })
      ])
    );
  })
})
