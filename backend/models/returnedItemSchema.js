const mongoose = require("mongoose");
const returnedItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/dcmqniwwc/image/upload/v1721453179/nwygugtii3lpwt7xnqgn.jpg",
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
  personDayScholarORhosteler: {
    type: String,
    enum: ["Day Scholar", "Hosteler"],
    default: "Day Scholar",
    required: true,
  },
  personStatus: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN", "BLOCKED"],
    default: "USER",
  },
  personNumber: {
    type: Number,
    default: undefined,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  returnedPersonName: { type: String, required: true },
  returnedPersonEmail: { type: String, required: true },
  returnedPersonDayScholarOrhosteler: {
    type: String,
    enum: ["Day Scholar", "Hosteler"],
    default: "Day Scholar",
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// creating model
const returnedItems = mongoose.model("returnedItems", returnedItemSchema);

module.exports = returnedItems;
