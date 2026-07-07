const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    // Find admin and include password (because password has select: false)
    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!admin) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send response
    res.status(200).json({
      message: "Login Successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Admin Login Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};