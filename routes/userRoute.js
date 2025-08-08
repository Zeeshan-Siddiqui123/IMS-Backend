const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller")
const validate = require("../middlewares/FormValidator")
const { registerSchema } = require("../validators/authvalidations");

//admin access users
router.get("/signup", authController.signupGet)
router.post("/signup",validate(registerSchema), authController.signupPost)
router.post("/login", authController.loginPost)
router.get("/logout", authController.logout)
router.put("/update/:_id", validate(registerSchema), authController.updateUser)
router.delete("/delete/:_id", authController.deleteUser)

module.exports = router;