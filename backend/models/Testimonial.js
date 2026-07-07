const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    review: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Testimonial",
  testimonialSchema
);