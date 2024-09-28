const users = require("./userSchema");
const foundItems = require("./foundItemSchema");
const nonRegisteredUser = require("./nonRegisteredUserSchema");
const lostItems = require("./lostItemSchema");
const returnedItems = require("./returnedItemSchema");

module.exports = {
  users,
  foundItems,
  nonRegisteredUser,
  lostItems,
  returnedItems,
};
