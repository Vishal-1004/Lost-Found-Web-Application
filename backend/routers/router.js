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

// Get all found items posted by a user
router.post("/api/v1/get-found-items-user", userControllers.getFoundItemsByUser);

//Update user/admin/blocked status of registered  users only by admins
router.post("/api/v1/change-user-status", adminControllers.changeStatus);

//Update user/blocked status of non registered users only by admin
router.post("/api/v1/change-non-registered-user-status",adminControllers.changeNonRegisteredUserStatus)

// Getting all non registered user data
router.post("/api/v1/get-all-non-registered-users",adminControllers.allNonRegisteredUsers)

router.put("/api/v1/edit-found-items", userControllers.editFoundItem);

router.delete("/api/v1/delete-found-items", userControllers.deleteFoundItem);

// Get user profile data
router.post("/api/v1/get-profile-data", userControllers.getProfileData);

// Get user profile graph
router.post("/api/v1/get-graph-data",userControllers.getProfileGraphData)

module.exports = router;
