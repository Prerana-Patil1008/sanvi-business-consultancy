const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/sendEmail");

// ======================================
// Register
// ======================================

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
    } = req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration Successful",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Login
// ======================================

exports.login = async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Forgot Password
// ======================================

exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "Email not registered",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetOTP = otp;

    user.otpExpiry =
      Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendOTP(email, otp);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Verify OTP
// ======================================

exports.verifyOTP = async (req, res) => {
  try {

    const {
      email,
      otp,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    res.json({
      success: true,
      message: "OTP Verified Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Reset Password
// ======================================

exports.resetPassword = async (req, res) => {
  try {

    const {
      email,
      otp,
      password,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetOTP = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Password Reset Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};