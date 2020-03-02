const { Factory } = require("rosie");
const faker = require("faker");
const ObjectId = require("bson-objectid");

const factory = new Factory()
  .attr("_id", () => new ObjectId())
  .attrs({
    name: faker.name.firstName
  });

module.exports = factory;
