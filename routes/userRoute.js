const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller")

// router.get("/signup", authController.signupGet)
router.post("/signup", authController.signupPost)

module.exports = router;