const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { UsertokenGenerator } = require("../utils/token");

const authController = {};

authController.signupPost = async (req, res) => {

  try {
    //   const parsed = registerSchema.safeParse(req.body);
    //   if (!parsed.success) {
    //     const firstError = parsed.error.errors[0].message;
    //     return res.status(400).json({ message: firstError });
    //   }

    const { bq_id, name, email, password, phone, CNIC, course } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This Email is Already Registered' });
    }

    //   const existingUsername = await userModel.findOne({ username });
    //   if (existingUsername) {
    //     return res.status(400).json({ message: 'This Username is not available, please try another' });
    //   }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //   const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //   const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // valid for 5 min

    const user = await userModel.create({ bq_id, name, email, password: hash, phone, CNIC, course });

    //   await sendOtp(email, otp);
    //   res.status(201).json({ message: "OTP sent to email. Please verify to complete registration." });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}
authController.signupGet = async (req, res) => {
  try {
    const users = await userModel.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Users', error })
  }
}

authController.loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }
    const token = UsertokenGenerator(user)
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

authController.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = authController;