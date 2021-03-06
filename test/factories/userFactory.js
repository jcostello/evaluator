const { Factory } = require("rosie");
const faker = require("faker");
const ObjectId = require("bson-objectid");

const factory = new Factory()
  .attr("_id", () => new ObjectId())
  .attrs({
    fullName: `${faker.name.firstName} ${faker.name.lastName}`
    email: faker.internet.email,
    token: faker.internet.password
  });

module.exports = factory;
