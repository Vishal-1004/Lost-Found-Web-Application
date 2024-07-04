const express = require("express");
const router = new express.Router();

const controllers = require("../controllers/userControllers");

// sample API
router.get("/", controllers.api);

module.exports = router;
