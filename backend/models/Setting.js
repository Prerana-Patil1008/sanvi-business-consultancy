const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: "Sanvi Consultancy",
    },

    tagline: {
      type: String,
      default: "",
    },

    phone1: {
      type: String,
      default: "",
    },

    phone2: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    officeHours: {
      type: String,
      default: "",
    },

    googleMap: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    logo: {
    type: String,
    default: ""
},

    youtube: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Setting",
  settingSchema
);