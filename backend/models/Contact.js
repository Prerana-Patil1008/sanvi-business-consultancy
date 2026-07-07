const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Invalid mobile number"],
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: ["Unread", "Read"],
      default: "Unread",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Contact",
  contactSchema
);