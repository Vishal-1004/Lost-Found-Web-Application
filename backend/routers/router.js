const express = require("express");
const router = new express.Router();
const multer = require("multer")

const controllers = require("../controllers/userControllers");
const upload = multer({ dest: 'uploads/' })

// sample API
router.get("/", controllers.api);

// User Login
router.post("/api/v1/login", controllers.login);

// User SignUp
router.post("/api/v1/sign-up", controllers.signup);

// Email verification and OTP Generation
router.post("/api/v1/otp-send", controllers.userOtpSend);

// OTP verification
router.post("/api/v1/otp-verify", controllers.verifyOtp);

// Reseting password
router.post("/api/v1/reset-password", controllers.resetPassword);

//Creating Found Post
router.post("/api/v1/create-found-post",upload.single('image'),controllers.createFoundPost)

module.exports = router;
