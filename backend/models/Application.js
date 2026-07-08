const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    service: {
      type: String,
      trim: true,
      required: true,
    },

    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    mobile: {
      type: String,
      trim: true,
      required: true,
      validate: {
  validator: function (v) {
    return /^[6-9]\d{9}$/.test(v);
  },
  message: "Enter a valid 10-digit Indian mobile number",
},
    },

    message: {
      type: String,
      trim: true,
    },

    documents: [
      {
        type: String,
      },
    ],

    // Application Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Quote Sent",
        "Under Review",
        "Approved",
        "Rejected",
        "Completed",
      ],
      default: "Pending",
    },

    remarks: {
      type: String,
      default: "",
    },

    // Payment Information
    quotedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Awaiting Quote",
        "Pending",
        "Verification Pending",
        "Paid",
        "Failed",
        "Rejected",
        "Refunded",
      ],
      default: "Awaiting Quote",
    },

    paymentLocked: {
      type: Boolean,
      default: false,
    },

    quoteSentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);