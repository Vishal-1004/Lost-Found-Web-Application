const express = require("express");
const router = new express.Router();
const multer = require("multer")

const {
  adminControllers,
  authControllers,
  userControllers,
} = require("../controllers");
const upload = multer({ dest: "uploads/" });

// sample API
router.get("/", authControllers.api);

// User Login
router.post("/api/v1/login", authControllers.login);

// Verify login token
router.post("/api/v1/verify-token", authControllers.verifyToken);

// User SignUp
router.post("/api/v1/sign-up", authControllers.signup);

// Email verification and OTP Generation
router.post("/api/v1/otp-send", authControllers.userOtpSend);

// OTP verification
router.post("/api/v1/otp-verify", authControllers.verifyOtp);

// Reseting password
router.post("/api/v1/reset-password", authControllers.resetPassword);

// Updating Day Scholar/Hosteler Info
router.post(
  "/api/v1/update-dayscholar-or-hosteler",
  userControllers.updateHostelerOrDayScholar
);

// Updating Phone Number
router.post("/api/v1/update-phone-number", userControllers.updatePhoneNumber);

// Update use password
router.post("/api/v1/update-password",userControllers.updatePassword)

// Delete user account
router.post("/api/v1/delete-account", userControllers.deleteUser)

// Creating Found Post
router.post(
  "/api/v1/create-found-post",
  upload.single("image"),
  userControllers.createFoundPost
);

// Get all users for admin to show
router.post("/api/v1/fetch-users", adminControllers.getAllUsers);

module.exports = router;