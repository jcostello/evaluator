const { Factory } = require('rosie');
const faker = require('faker');
const ObjectId = require("bson-objectid");

const factory = new Factory()
  .attr('_id', () => ObjectId.generate())
  .attr('id', ['_id'], (_id) => _id)
  .attrs({
    description: faker.lorem.sentence,
    name: faker.commerce.productName,
    price: faker.commerce.price
  })

module.exports = factory;