const express = require("express");

const router = express.Router();

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController");

// Get Business Settings
router.get("/", getSettings);

// Update Business Settings
router.put("/", updateSettings);

module.exports = router;