const express = require("express");

const router = express.Router();

const {
  getUsers,
  deleteUser,
  updateProfile,
} = require("../controllers/userController");

// ============================
// Get All Users
// ============================

router.get("/", getUsers);

// ============================
// Update Profile
// ============================

router.put("/:id", updateProfile);

// ============================
// Delete User
// ============================

router.delete("/:id", deleteUser);

module.exports = router;