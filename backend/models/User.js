
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    resetOTP: {
  type: String,
  default: null,
},

otpExpiry: {
  type: Date,
  default: null,
},

    role: {
      type: String,
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);

