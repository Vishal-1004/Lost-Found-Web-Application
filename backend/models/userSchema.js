const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "abcdefghijklmnop";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  registrationNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  dayScholarORhosteler: {
    type: String,
    enum: ["Day Scholar", "Hosteler"],
    default: "Day Scholar",
    required: true,
  },
  phoneNumber: {
    type: Number,
    default: "",
  },
  lostItemsID: {
    type: [String],
    default: [],
  },
  foundItemsID: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ["USER", "ADMIN", "BLOCKED"],
    default: "USER",
    required: true,
  },
  otp: {
    type: String,
  },
  authToken: {
    type: String,
  },
  notifications: {
    type: Boolean,
    default: false,
  },
});

// hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

// token generate
userSchema.methods.generateAuthtoken = async function () {
  try {
    let newToken = jwt.sign({ _id: this._id }, SECRECT_KEY, {
      expiresIn: "1h", // 1h sets the expiration to 1 hour (30m for 30 minutes)
    });

    this.authToken = newToken;
    await this.save();
    return newToken;
  } catch (error) {
    throw new Error(error);
  }
};

// creating model
const users = mongoose.model("users", userSchema);

module.exports = users;
