const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "abcdefghijklmnop";
const nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Importing models/schemas
const { users } = require("../models");

// sample API
exports.api = async (req, res) => {
  res.status(200).json({ message: "Server is working" });
};

// User Login
exports.login = async (req, res) => {
  const { registrationNo, password } = req.body;

  if (!registrationNo || !password) {
    return res.status(400).json({ error: "Please enter all input fields" });
  }

  try {
    const user = await users.findOne({ registrationNo });

    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);

      if (passwordCheck) {
        if (user.status === "BLOCKED") {
          return res
            .status(200)
            .json({ message: "Sorry!, you are blocked by the admin" });
        } else {
          const token = await user.generateAuthtoken();

          return res.status(200).json({
            message: "Login Successfull!",
            userToken: token,
            status: user.status,
          });
        }
      } else {
        return res.status(400).json({ message: "Wrong Password" });
      }
    } else {
      return res.status(400).json({ message: "Please Register First" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(400)
      .json({ message: "Internal Sever Error", specificError: error.message });
  }
};

// User SignUp
exports.signup = async (req, res) => {
  const { name, email, password, registrationNo, dayScholarORhosteler } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !registrationNo ||
    !dayScholarORhosteler
  ) {
    return res.status(400).json({ message: "Please enter all input fields" });
  }

  try {
    const user = await users.findOne({ registrationNo });

    if (user) {
      return res.status(400).json({ error: "User Allready Exist" });
    } else {
      const registerUser = new users({
        name,
        registrationNo,
        email,
        dayScholarORhosteler,
        password,
        status: "USER",
      });

      await registerUser.save();
      return res.status(200).json({ message: "SignUp Successfull!" });
    }
  } catch (error) {
    console.error("Error during SignUp:", error);
    return res
      .status(400)
      .json({ message: "Internal Sever Error", specificError: error.message });
  }
};
