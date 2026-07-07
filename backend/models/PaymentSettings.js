const mongoose = require("mongoose");

const paymentSettingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: "Sanvi Business Consultancy",
      trim: true,
    },

    upiId: {
      type: String,
      default: "",
    },

    qrImage: {
      type: String,
      default: "",
    },

    paymentInstructions: {
      type: String,
      default:
        "Pay the quoted amount using the QR code below and upload the payment screenshot for verification.",
    },

    supportNumber: {
      type: String,
      default: "",
    },

    supportEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
      default: "",
    },
     

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PaymentSettings",
  paymentSettingsSchema
);