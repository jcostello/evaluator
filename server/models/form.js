const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  questionType: {
    type: String,
    required: true,
    trim: true
  },
  comments: {
    type: Boolean,
    default: false
  },
  optional: {
    type: Boolean,
    default: false
  },
  answers: [
    {
      type: String,
      trim: true
    }
  ]
});

const formSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  questions: [questionSchema]
});

formSchema.set("toJSON", {
  virtuals: true
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
