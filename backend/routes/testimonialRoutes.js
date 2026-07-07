const express = require("express");

const router = express.Router();

const {
  getTestimonials,
  getApprovedTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// Public
router.get("/", getApprovedTestimonials);

// Admin
router.get("/all", getTestimonials);
router.get("/:id", getTestimonialById);

router.post("/", createTestimonial);

router.put("/:id", updateTestimonial);

router.delete("/:id", deleteTestimonial);

module.exports = router;