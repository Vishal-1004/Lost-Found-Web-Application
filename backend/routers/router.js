const express = require("express");
const router = new express.Router();

const controllers = require("../controllers/userControllers");

// sample API
router.get("/", controllers.api);

// User Login
router.post("/login", controllers.login);

// User SignUp
router.post("/sign-up", controllers.signup);

//OTP generation
router.post("/otp-send", controllers.userOtpSend);
//OTP verification
router.post("/otp-verify", controllers.verifyOtp);
module.exports = router;
