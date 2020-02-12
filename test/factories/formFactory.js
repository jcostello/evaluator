const { Factory } = require("rosie");
const faker = require("faker");
const ObjectId = require("bson-objectid");

const factory = new Factory()
  .attr("id", () => ObjectId.generate())
  .attr("_id", ["id"], id => id.id)
  .attrs({
    name: faker.name.firstName,
    questions: [
      {
        question: faker.lorem.sentence(),
        questionType: "text"
      }
    ]
  });

module.exports = factory;
