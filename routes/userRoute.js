const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller")


//admin access users
router.get("/signup", authController.signupGet)
router.post("/signup", authController.signupPost)
router.post("/login", authController.loginPost)
router.get("/logout", authController.logout)
router.put("/update/:_id", authController.updateUser)
router.delete("/delete/:_id", authController.deleteUser)

module.exports = router;