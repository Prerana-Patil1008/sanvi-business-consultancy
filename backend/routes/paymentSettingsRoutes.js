const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/paymentUpload"
);

const {

  getPaymentSettings,

  updatePaymentSettings,

} = require(
  "../controllers/paymentSettingsController"
);

// Get Settings

router.get(
  "/",
  getPaymentSettings
);

// Update Settings

router.put(
  "/",
  upload.single("qrImage"),
  updatePaymentSettings
);

module.exports = router;