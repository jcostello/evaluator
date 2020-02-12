const { Factory } = require("rosie");
const faker = require("faker");
const ObjectId = require("bson-objectid");

const factory = new Factory()
  .attr("_id", () => ObjectId.generate())
  .attr("id", ["_id"], _id => _id.id)
  .attrs({
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    email: faker.internet.email,
    password: faker.internet.password,
    token: faker.internet.password
  });

module.exports = factory;
