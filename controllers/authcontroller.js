const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const authController = {};

// authController.signupGet = (req, res) => {
//     const sessionData = req.session.tempUser || {};

//     res.render("User-signup", {
//         layout: false,
//         error: req.flash("error")[0] || null,
//         success: req.flash("success")[0] || null,
//         showOtp: !!sessionData.signupOtp,  // Show OTP input if OTP was generated
//         old: {
//             userName: sessionData.userName || "",
//             email: sessionData.email || "",
//         },
//     });
// };

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


module.exports = authController;