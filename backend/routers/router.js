const express = require("express");
const router = new express.Router();
const multer = require("multer");

// image storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// image filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allow"));
  }
};

// calling multer
const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

const {
  adminControllers,
  authControllers,
  userControllers,
} = require("../controllers");

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

//Updating Phone Number
router.post("/api/v1/update-phone-number", userControllers.updatePhoneNumber);

// Updating Phone Number
router.post("/api/v1/update-phone-number", userControllers.updatePhoneNumber);

// Update use password
router.post("/api/v1/update-password", userControllers.updatePassword);

// Delete user account
router.post("/api/v1/delete-account", userControllers.deleteUser);

// Creating Found Post
router.post(
  "/api/v1/create-found-post",
  upload.single("photo"),
  userControllers.createFoundPost
);

// Getting all found items
router.get("/api/v1/get-found-items", userControllers.fetchFoundItems);

// Get all users for admin to show
router.post("/api/v1/get-all-users", adminControllers.getAllUsers);

router.post("/api/v1/update-password", userControllers.updatePassword);

router.post("/api/v1/account-delete", userControllers.deleteAccount);

router.get("/api/v1/get-found-items-user", userControllers.getFoundItemsByUser);
module.exports = router;
