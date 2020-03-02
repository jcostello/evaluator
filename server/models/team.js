const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

teamSchema.set("toJSON", {
  virtuals: true
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
