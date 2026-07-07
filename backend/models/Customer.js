const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Invalid mobile number"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    documentUrl: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum:[
      "Pending",
      "Approved",
      "Rejected",
      "Completed"
      ]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);