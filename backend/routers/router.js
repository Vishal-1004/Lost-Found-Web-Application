const express = require("express");
const router = new express.Router();

const controllers = require("../controllers/userControllers");

// sample API
router.get("/", controllers.api);

// User Login
router.post("/login",controllers.login)

// User SignUp
router.post("/sign-up",controllers.signup)

module.exports = router;
