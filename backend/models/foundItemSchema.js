const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  personName: {
    type: String,
    required: true,
  },
  personRegistrationNumber: {
    type: String,
    required: true,
  },
  personEmail: {
    type: String,
    required: true,
  },
  personNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// creating model
const foundItems = mongoose.model("foundItems", foundItemSchema);

module.exports = foundItems;
