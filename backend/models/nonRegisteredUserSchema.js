const mongoose = require("mongoose");

const nonRegisteredUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  foundItemsIds: {
    type: [String],
    default: [],
  },
});

// creating model
const nonRegisteredUser = mongoose.model(
  "nonRegisteredUser",
  nonRegisteredUserSchema
);

module.exports = nonRegisteredUser;