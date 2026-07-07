const PaymentSettings = require("../models/PaymentSettings");

// ======================================
// Get Payment Settings
// ======================================

exports.getPaymentSettings = async (req, res) => {
  try {

    let settings = await PaymentSettings.findOne();

    if (!settings) {

      settings = await PaymentSettings.create({});

    }

    res.json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ======================================
// Update Payment Settings
// ======================================

exports.updatePaymentSettings = async (req, res) => {
  try {

    let settings = await PaymentSettings.findOne();

    if (!settings) {

      settings = new PaymentSettings();

    }

    settings.businessName = req.body.businessName;
    settings.upiId = req.body.upiId;
    settings.paymentInstructions =
      req.body.paymentInstructions;

    settings.supportNumber =
      req.body.supportNumber;

    settings.supportEmail =
      req.body.supportEmail;

    if (req.file) {

      settings.qrImage = req.file.filename;

    }

    await settings.save();

    res.json({
      success: true,
      message: "Payment Settings Updated Successfully",
      settings,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};