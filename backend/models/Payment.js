const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: String,
      trim: true,
      required: true,
    },

    amount: {
      type: Number,
      min: 1,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["QR", "Razorpay"],
      default: "QR",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Verification Pending",
        "Paid",
        "Rejected",
        "Refunded",
      ],
      default: "Pending",
    },

    screenshot: {
      type: String,
      trim: true,
      default: "",
    },

    transactionId: {
      type: String,
      trim: true,
      default: "",
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    verifiedBy: {
      type: String,
      trim: true,
      default: "",
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    receiptNumber: {
      type: String,
      trim: true,
      default: "",
    },

    receiptUrl: {
      type: String,
      default: "",
    },

    receiptGenerated: {
      type: Boolean,
      default: false,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);