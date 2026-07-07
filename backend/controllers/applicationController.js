const Application = require("../models/Application");
const Payment = require("../models/Payment");
const { sendEmail } = require("../utils/sendEmail");

// ======================================
// Create Application
// ======================================
exports.createApplication = async (req, res) => {
  try {
    const files = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const application = await Application.create({
      user: req.body.user,
      service: req.body.service,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      message: req.body.message,
      documents: files,
    });

    // Send email without failing the API
    if (application.email) {
      try {
        await sendEmail(
          application.email,
          "Application Submitted Successfully",
          application
        );

        console.log("Confirmation email sent.");
      } catch (emailError) {
        console.error(
          "Email sending failed:",
          emailError.message
        );
      }
    }

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });

  } catch (error) {
    console.error("Create Application Error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Get All Applications
// ======================================

exports.getApplications = async (req, res) => {
  try {

    const applications = await Application.find().sort({
      createdAt: -1,
    });

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Get User Applications
// ======================================

exports.getUserApplications = async (req, res) => {
  try {

    const applications = await Application.find({
  user: req.params.id,
})
.sort({
  createdAt: -1,
})
.lean();

const Payment = require("../models/Payment");

for (let application of applications) {

  const payment = await Payment.findOne({
    application: application._id,
  });

  application.payment = payment;

}

res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Get Application By ID
// ======================================

exports.getApplicationById = async (req, res) => {
  try {

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json(application);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Update Application
// ======================================

exports.updateApplication = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Update application
    application.status = status;
    application.remarks = remarks;

    // Find related payment
    const payment = await Payment.findOne({
      application: application._id,
    });

    // ======================================
    // Processing
    // ======================================

    if (status === "Processing") {
      application.paymentStatus = "Paid";

      if (payment) {
        payment.paymentStatus = "Paid";
        await payment.save();
      }
    }

    // ======================================
    // Approved
    // ======================================

    if (status === "Approved") {
      application.paymentStatus = "Paid";
      application.paymentLocked = true;

      if (payment) {
        payment.paymentStatus = "Paid";
        payment.verifiedAt = new Date();

        if (!payment.receiptNumber) {
          payment.receiptNumber =
            "SANVI-" +
            new Date().getFullYear() +
            "-" +
            Date.now();
        }

        await payment.save();
      }
    }

    // ======================================
    // Rejected
    // ======================================

    if (status === "Rejected") {
      application.paymentLocked = false;

      if (payment) {
        payment.paymentStatus = "Rejected";
        payment.remarks = remarks || "";

        await payment.save();
      }
    }

    await application.save();

    // Send Status Update Email
    if (application.email) {
      await sendEmail(
        application.email,
        "Application Status Updated",
        application
      );
    }

    res.json({
      message: "Application updated successfully.",
      application,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================
// Delete Application
// ======================================

exports.deleteApplication = async (req, res) => {
  try {

    const application = await Application.findByIdAndDelete(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      message: "Application Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ======================================
// Send Payment Quote
// ======================================

exports.sendQuote = async (req, res) => {
  try {
    const { quotedAmount } = req.body;

    if (!quotedAmount || quotedAmount <= 0) {
      return res.status(400).json({
        message: "Please enter a valid amount.",
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    if (application.paymentLocked) {
      return res.status(400).json({
        message: "Payment already completed. Quote cannot be changed.",
      });
    }

    // Update Application
    application.quotedAmount = quotedAmount;
    application.paymentStatus = "Pending";
    application.status = "Quote Sent";
    application.quoteSentAt = new Date();

    await application.save();

    
    // Check existing payment
    let payment = await Payment.findOne({
      application: application._id,
    });
    console.log("Creating payment with:", {
      application: application._id,
      customer: application.user,
      service: application.service,
      amount: quotedAmount,
    });
    if (!payment) {
      payment = await Payment.create({
        application: application._id,
        customer: application.user,
        service: application.service,
        amount: quotedAmount,
        paymentMethod: "QR",
        paymentStatus: "Pending",
      });

    } else {
      payment.amount = quotedAmount;
      payment.service = application.service;
      payment.customer = application.user;
      payment.paymentMethod = "QR";
      payment.paymentStatus = "Pending";
      await payment.save();
    }

    res.json({
      message: "Payment quote sent successfully.",
      application,
      payment,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};