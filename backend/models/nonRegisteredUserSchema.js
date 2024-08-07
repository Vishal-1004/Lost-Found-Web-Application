const mongoose = require("mongoose");

const nonRegisteredUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
  foundItemsID: {
    type: [String],
    default: [],
  },
  lostItemsID:{
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ["USER", "BLOCKED"],
    default: "USER",
    required: true,
  },
});

// creating model
const nonRegisteredUser = mongoose.model(
  "nonRegisteredUser",
  nonRegisteredUserSchema
);

module.exports = nonRegisteredUser;
