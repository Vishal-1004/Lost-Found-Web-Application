const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "abcdefghijklmnop";
const nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Importing models/schemas
const { users } = require("../models");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vitcseguide@gmail.com",
    pass: "gvdt kqqs zzvr vfib",
  },
});

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
            name: user.name,
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
      return res.status(400).json({ message: "User Allready Exist" });
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

// Verifying Email and Genearting OTP
exports.userOtpSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please Enter Your Email" });
  }

  try {
    const preuser = await users.findOne({ email: email });

    if (preuser) {
      const OTP = Math.floor(100000 + Math.random() * 900000);

      preuser.otp = OTP;
      await preuser.save();

      const mailOptions = {
        from: "vitcseguide@gmail.com",
        to: email,
        subject: "Sending Email For OTP Validation",
        text: `OTP:- ${OTP}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          return res.status(400).json({ message: "email not sent" });
        } else {
          console.log("Email sent", info.response);
          return res.status(200).json({ message: "email sent Successfully" });
        }
      });
    } else {
      return res
        .status(400)
        .json({ message: "This email is not yet registered" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid details", error });
  }
};

// OTP verification
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ message: "Both email and OTP must be entered" });
  }

  try {
    const user = await users.findOne({ email });

    if (user && user.otp === otp) {
      user.otp = null;
      await user.save();

      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid OTP or email" });
    }
  } catch (error) {
    console.error("Error verifying OTP", error);
    return res.status(400).json({ message: "Invalid Details", error });
  }
};

//Password reset
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ error: "Both email and the new password must be entered" });
  }

  try {
    const user = await users.findOne({ email });

    if (user) {
      user.password = newPassword;
      await user.save();

      return res.status(200).json({ message: "Password reset successful" });
    } else {
      return res
        .status(400)
        .json({ error: "This user does not exist in our DB" });
    }
  } catch (error) {
    console.error("Error during password reset", error);
    return res.status(400).json({ message: "Invalid Details", error });
  }
};
