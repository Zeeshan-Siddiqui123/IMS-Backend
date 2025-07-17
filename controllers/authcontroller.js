const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const authController = {};

authController.signupGet = (req, res) => {
    const sessionData = req.session.tempUser || {};

    res.render("User-signup", {
        layout: false,
        error: req.flash("error")[0] || null,
        success: req.flash("success")[0] || null,
        showOtp: !!sessionData.signupOtp,  // Show OTP input if OTP was generated
        old: {
            userName: sessionData.userName || "",
            email: sessionData.email || "",
        },
    });
};

module.exports = authController;