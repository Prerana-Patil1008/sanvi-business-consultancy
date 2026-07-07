const express = require("express");

const router = express.Router();

const {
  getDashboardReport,
} = require("../controllers/reportController");

// Dashboard Report
router.get(
  "/dashboard",
  getDashboardReport
);

module.exports = router;