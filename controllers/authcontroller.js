const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { UsertokenGenerator } = require("../utils/token");
const { registerSchema } = require("../validators/authvalidations");

const authController = {};

authController.signupPost = async (req, res) => {

  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      const error = parsed.error?.errors?.[0];
      if (error) {
        return res.status(400).json({ field: error.path.join('.'), message: error.message });
      }
      return res.status(400).json({ message: 'Invalid input.' });
    }

    const { bq_id, name, email, password, phone, CNIC, course } = parsed.data;

    const existingbq_id = await userModel.findOne({ bq_id });
    if (existingbq_id) {
      return res.status(400).json({ message: 'This BQ Id is not available, please try another' });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This Email is Already Registered' });
    }

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