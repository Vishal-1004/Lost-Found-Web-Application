const express = require("express");
const router = new express.Router();

const controllers = require("../controllers/userControllers");

// sample API
router.get("/", controllers.api);

// User Login
router.post("/api/v1/login", controllers.login);

// User SignUp
router.post("/api/v1/sign-up", controllers.signup);

// Email verification and OTP Generation
router.post("/api/v1/otp-send", controllers.userOtpSend);

//OTP verification
router.post("/api/v1/otp-verify", controllers.verifyOtp);

router.post("/api/v1/password-reset", controllers.resetPassword);
module.exports = router;
