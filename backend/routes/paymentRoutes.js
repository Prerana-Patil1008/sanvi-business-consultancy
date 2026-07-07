const express = require("express");
const router = express.Router();

const uploadPayment = require("../middleware/paymentUpload");

const {
  uploadPayment: uploadPaymentController,
  getPaymentByApplication,
  getPayments,
  approvePayment,
  rejectPayment,
  downloadReceipt,
  getReceiptData,
} = require("../controllers/paymentController");

// ======================================
// Customer Upload Payment Screenshot
// ======================================

router.post(
  "/upload",
  uploadPayment.single("screenshot"),
  uploadPaymentController
);

// ======================================
// Customer - Get Payment by Application
// ======================================

router.get(
  "/application/:applicationId",
  getPaymentByApplication
);

// ======================================
// Customer - Download Receipt
// ======================================

router.get(
  "/receipt/:id",
  downloadReceipt
);

// ======================================
// Admin - Get All Payments
// ======================================

router.get(
  "/",
  getPayments
);

// ======================================
// Get Receipt Data
// ======================================

router.get(
  "/:paymentId",
  getReceiptData
);

// ======================================
// Admin - Approve Payment
// ======================================

router.put(
  "/approve/:id",
  approvePayment
);

// ======================================
// Admin - Reject Payment
// ======================================

router.put(
  "/reject/:id",
  rejectPayment
);

router.get("/test", (req, res) => {
  res.send("Payment route is working");
});

module.exports = router;