const Payment = require("../models/Payment");
const Application = require("../models/Application");
const generateReceipt = require("../utils/generateReceipt");
const Settings = require("../models/Setting");
const path = require("path");

// ======================================
// Upload Payment Screenshot
// ======================================

exports.uploadPayment = async (req, res) => {
  try {
    console.log("===== PAYMENT REQUEST =====");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { applicationId, transactionId } = req.body;

    const application = await Application.findById(applicationId);

    console.log("Application:", application);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    const payment = await Payment.findOne({
      application: applicationId,
    });

    console.log("Payment:", payment);

    if (!payment) {
      return res.status(404).json({
        message: "Payment record not found.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Payment screenshot is required.",
      });
    }

    payment.screenshot = req.file.filename;
    payment.transactionId = transactionId || "";

    if (!payment.service) {
      payment.service = application.service;
    }

    payment.paymentStatus = "Verification Pending";

    console.log("Payment before save:");
    console.log(payment);

    await payment.save();

    application.paymentStatus = "Verification Pending";
    await application.save();

    res.json({
      success: true,
      message: "Payment submitted successfully.",
      payment,
    });

  } catch (error) {
    console.error("========== PAYMENT ERROR ==========");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      message: error.message,
    });
  }
};
// ======================================
// Get Payment By Application
// ======================================

exports.getPaymentByApplication = async (req, res) => {
  try {

    const payment = await Payment.findOne({
      application: req.params.applicationId,
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found.",
      });
    }

    res.json(payment);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Get All Payments (Admin)
// ======================================

exports.getPayments = async (req, res) => {
  try {

    const payments = await Payment.find()
      .populate("customer", "name email")
      .populate("application");

    res.json(payments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Approve Payment
// ======================================

// ======================================
// Approve Payment
// ======================================

exports.approvePayment = async (req, res) => {
  try {

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found.",
      });
    }

    const application = await Application.findById(
      payment.application
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    // ==========================
    // Approve payment first
    // ==========================

    payment.paymentStatus = "Paid";
    payment.paymentDate = new Date();
    payment.verifiedAt = new Date();
    payment.verifiedBy = "Administrator";

    application.paymentStatus = "Paid";
    application.paymentLocked = true;

    application.status = "Under Review";

    application.remarks =
      "Payment verified successfully. Your application is under processing.";

    await payment.save();
    await application.save();

    // ==========================
    // Try generating receipt
    // ==========================

    try {

      const settings = await Settings.findOne();

      const receipt = await generateReceipt(
        payment,
        application,
        settings
      );

      payment.receiptNumber = receipt.receiptNumber;
      payment.receiptUrl = receipt.fileName;
      payment.receiptGenerated = true;

      await payment.save();

      console.log("Receipt Generated Successfully");

    } catch (receiptError) {

      console.log("Receipt Generation Failed");
      console.log(receiptError.message);

      // Don't fail payment approval
    }

    return res.json({
      success: true,
      message: "Payment Approved Successfully",
      payment,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ======================================
// Reject Payment
// ======================================

exports.rejectPayment = async (req, res) => {
  try {

    const { remarks } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found.",
      });
    }

    payment.paymentStatus = "Rejected";
    payment.remarks = remarks || "";

    await payment.save();

    const application = await Application.findById(
      payment.application
    );

    if (application) {

      application.paymentStatus = "Failed";

      await application.save();

    }

    res.json({
      message: "Payment Rejected Successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.downloadReceipt = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    console.log("Receipt URL:", payment.receiptUrl);

    if (!payment.receiptUrl) {
      return res.status(404).json({
        message: "Receipt has not been generated yet.",
      });
    }

    const filePath = path.join(
      __dirname,
      "../uploads/receipts",
      payment.receiptUrl
    );

    console.log("Receipt Path:", filePath);

    return res.download(filePath);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ======================================
// Get Receipt Data
// ======================================

exports.getReceiptData = async (req, res) => {

  try {

    const payment = await Payment.findById(
      req.params.paymentId
    );

    if (!payment) {

      return res.status(404).json({
        message: "Payment not found"
      });

    }

    const application =
      await Application.findById(
        payment.application
      );

    if (!application) {

      return res.status(404).json({
        message: "Application not found"
      });

    }

    const settings =
      await Settings.findOne();

    res.json({

      payment,

      application,

      settings,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,

    });

  }

};