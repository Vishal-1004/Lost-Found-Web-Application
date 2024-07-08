const express = require("express");
const router = new express.Router();
const multer = require("multer")

const authControllers = require("../controllers/authControllers");
const userControllers = require("../controllers/userControllers")
const upload = multer({ dest: "uploads/" });

// sample API
router.get("/", authControllers.api);

// User Login
router.post("/api/v1/login", authControllers.login);

// User SignUp
router.post("/api/v1/sign-up", authControllers.signup);

// Email verification and OTP Generation
router.post("/api/v1/otp-send", authControllers.userOtpSend);

// OTP verification
router.post("/api/v1/otp-verify", authControllers.verifyOtp);

// Reseting password
router.post("/api/v1/reset-password", authControllers.resetPassword);

//Creating Found Post
router.post("/api/v1/create-found-post",upload.single("image"),userControllers.createFoundPost);

module.exports = router;
