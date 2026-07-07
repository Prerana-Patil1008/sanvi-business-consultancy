const Testimonial = require("../models/Testimonial");

// ===============================
// Get All Testimonials
// ===============================

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({
      createdAt: -1,
    });

    res.json(testimonials);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Approved Testimonials
// ===============================

exports.getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      status: "Approved",
    }).sort({
      createdAt: -1,
    });

    res.json(testimonials);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Create Testimonial
// ===============================

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create({
      customerName: req.body.customerName,
      service: req.body.service,
      rating: req.body.rating,
      review: req.body.review,
      status: "Pending",
    });

    res.status(201).json(testimonial);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Update Status
// ===============================

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial =
      await Testimonial.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(testimonial);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Delete Testimonial
// ===============================

exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Testimonial deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// Get Testimonial By ID
// ===============================

exports.getTestimonialById = async (req, res) => {
  try {

    const testimonial = await Testimonial.findById(
      req.params.id
    );

    if (!testimonial) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    res.json(testimonial);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};